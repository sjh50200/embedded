import time, random
import threading
import numpy as np
from absl import app, flags, logging
from absl.flags import FLAGS
import cv2
import matplotlib.pyplot as plt
import tensorflow as tf
from yolov3_tf2.models import (
    YoloV3, YoloV3Tiny
)
from yolov3_tf2.dataset import transform_images
from yolov3_tf2.utils import draw_outputs, convert_boxes

from deep_sort import preprocessing
from deep_sort import nn_matching
from deep_sort.detection import Detection
from deep_sort.tracker import Tracker
from tools import generate_detections as gdet
from PIL import Image
import datetime

flags.DEFINE_string('classes', './data/labels/coco.names', 'path to classes file')
flags.DEFINE_string('weights', './weights/yolov3.tf',
                    'path to weights file')
flags.DEFINE_boolean('tiny', False, 'yolov3 or yolov3-tiny')
flags.DEFINE_integer('size', 416, 'resize images to')
flags.DEFINE_string('video', './data/video/test.mp4',
                    'path to video file or number for webcam)')
flags.DEFINE_string('output', None, 'path to output video')
flags.DEFINE_string('output_format', 'XVID', 'codec used in VideoWriter when saving video to file')
flags.DEFINE_integer('num_classes', 80, 'number of classes in the model')

time_car = int(0)

def fun_plus():
    global time_car
    time_car += 1
        
def main(_argv):
    # Definition of the parameters
    max_cosine_distance = 0.5
    nn_budget = None
    nms_max_overlap = 1.0
    
    #initialize deep sort
    model_filename = 'model_data/mars-small128.pb'
    encoder = gdet.create_box_encoder(model_filename, batch_size=1)
    metric = nn_matching.NearestNeighborDistanceMetric("cosine", max_cosine_distance, nn_budget)
    tracker = Tracker(metric)

    physical_devices = tf.config.experimental.list_physical_devices('GPU')
    if len(physical_devices) > 0:
        tf.config.experimental.set_memory_growth(physical_devices[0], True)

    if FLAGS.tiny:
        yolo = YoloV3Tiny(classes=FLAGS.num_classes)
    else:
        yolo = YoloV3(classes=FLAGS.num_classes)

    yolo.load_weights(FLAGS.weights)
    logging.info('weights loaded')

    class_names = [c.strip() for c in open(FLAGS.classes).readlines()]
    logging.info('classes loaded')

    try:
        vid = cv2.VideoCapture(int(FLAGS.video))
    except:
        vid = cv2.VideoCapture(FLAGS.video)

    out = None

    if FLAGS.output:
        # by default VideoCapture returns float instead of int
        width = int(vid.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(vid.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = int(vid.get(cv2.CAP_PROP_FPS))
        codec = cv2.VideoWriter_fourcc(*FLAGS.output_format)
        out = cv2.VideoWriter(FLAGS.output, codec, fps, (width, height))
        list_file = open('detection.txt', 'w')
        frame_index = -1 
    
    fps = 0.0
    count = 0
    accident_time = datetime.datetime.now()
    while True:
        _, img = vid.read()

        if img is None:
            logging.warning("Empty Frame")
            time.sleep(0.1)
            count+=1
            if count < 3:
                continue
            else: 
                break

        img_in = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) 
        img_in = tf.expand_dims(img_in, 0)
        img_in = transform_images(img_in, FLAGS.size)

        t1 = time.time()
        boxes, scores, classes, nums = yolo.predict(img_in)
        classes = classes[0]
        names = []
        for i in range(len(classes)):
            names.append(class_names[int(classes[i])])
        names = np.array(names)
        converted_boxes = convert_boxes(img, boxes[0])
        features = encoder(img, converted_boxes)    
        detections = [Detection(bbox, score, class_name, feature) for bbox, score, class_name, feature in zip(converted_boxes, scores[0], names, features)]
        
        #initialize color map
        cmap = plt.get_cmap('tab20b')
        colors = [cmap(i)[:3] for i in np.linspace(0, 1, 20)]

        # run non-maxima suppresion
        boxs = np.array([d.tlwh for d in detections])
        scores = np.array([d.confidence for d in detections])
        classes = np.array([d.class_name for d in detections])
        indices = preprocessing.non_max_suppression(boxs, classes, nms_max_overlap, scores)
        detections = [detections[i] for i in indices]        

        # Call the tracker
        tracker.predict()
        tracker.update(detections)

        report1 = open("report1.txt",'w', encoding = 'utf-8')#추적한 차량의 경로 기록
        carType = open("type.txt", 'r', encoding = 'utf-8')#추적할 차량의 차종 읽기 (차량의 차종, 색상)
        tyype = carType.readline()
        direction1 = str(None)
        attacker_color = str(None)
        attacker_type = str(None)
        
        for track in tracker.tracks:
            if not track.is_confirmed() or track.time_since_update > 1:
                continue 
            bbox = track.to_tlbr()
            class_name = track.get_class()
            color = colors[int(track.track_id) % len(colors)]
            color = [i * 255 for i in color]
            if int(time_car) >= int(35):
                cv2.rectangle(img, (int(bbox[0]), int(bbox[1])), (int(bbox[2]), int(bbox[3])), color, 2)
                cv2.rectangle(img, (int(bbox[0]), int(bbox[1]-30)), (int(bbox[0])+(len(class_name)+len(str(track.track_id)))*17, int(bbox[1])), color, -1)
            y = int(bbox[0] + bbox[2])/2.0 #객체의 중앙 좌표 y좌표
            x = int(bbox[1] + bbox[3])/2.0 #객체의 중앙 좌표 x좌표
            x = round(x)
            y = round(y)
            if str(class_name) == "Attacker":
                fun_plus()
                attacker_color = "White"
                attacker_type = str(tyype)
                #attacker_type = "SsangYong_KORANDO"
                if int(time_car) < int(60) and int(time_car) >= int(35):
                    cv2.putText(img, class_name + "," + str(y) + "," + str(x),(int(bbox[0]), int(bbox[1]-10)),0, 0.5, (255,255,255),2)
                elif int(time_car) >= 60:
                    cv2.rectangle(img, (int(bbox[0]), int(bbox[1]-30)), (int(bbox[0])+(len(class_name)+len(str(track.track_id)))*35, int(bbox[1])), color, -1)
                    cv2.putText(img, class_name + "," + str(attacker_type) + "," + str(attacker_color) + "," + str(y) + "," + str(x),(int(bbox[0]), int(bbox[1]-10)),0, 0.5, (255,255,255),2)
              
            height, width, _ = img.shape
            
            center_y = int(((bbox[1])+(bbox[3]))/2) #y축에대한 좌표 영역분할
            center_x = int(((bbox[0])+(bbox[2]))/2) #x축에대한 좌표 영역분할         
            
            
            if center_x >= int(9*width/12+width/30): #우
                #추적할 차량의 class name과 일치할 경우 추적차량의 예상경로는 우
                if class_name == tyype:
                    direction1 = "Right"
                    data = str(attacker_type) + " " + str(attacker_color) + " " + str(direction1) + " " + str(accident_time) + "\n"
                    report1.write(data)
            elif center_x <= int(3*width/12+width/30) and center_y <= int(3*height/12+height/30): #좌
                #추적할 차량의 class name과 일치할 경우 추적차량의 예상경로는 좌
                if class_name == tyype:
                    direction1 = "Left"
                    data = str(attacker_type) + " " + str(attacker_color) + " " + str(direction1) + " " + str(accident_time) + "\n"
                    report1.write(data)

        report1.close()
        carType.close()
            
        
        ### UNCOMMENT BELOW IF YOU WANT CONSTANTLY CHANGING YOLO DETECTIONS TO BE SHOWN ON SCREEN
        #for det in detections:
        #    bbox = det.to_tlbr() 
        #    cv2.rectangle(img,(int(bbox[0]), int(bbox[1])), (int(bbox[2]), int(bbox[3])),(255,0,0), 2)
        
        # print fps on screen 
        fps  = ( fps + (1./(time.time()-t1)) ) / 2
        cv2.putText(img, "FPS: {:.2f}".format(fps), (0, 10),
                          cv2.FONT_HERSHEY_COMPLEX_SMALL, 0.5, (0, 0, 255), 2)
        if direction1 == "Left":
            cv2.putText(img, 'Left', (100,240), 0, 0.6, (0,0,255),2)
            cv2.putText(img, 'Right', (700,240), 0, 0.6, (0,255,0),2)
        elif direction1 == "Right":
            cv2.putText(img, 'Left', (100,240), 0, 0.6, (0,255,0),2)
            cv2.putText(img, 'Right', (700,240), 0, 0.6, (0,0,255),2)
        else:
            cv2.putText(img, 'Left', (100,240), 0, 0.6, (0,255,0),2)
            cv2.putText(img, 'Right', (700,240), 0, 0.6, (0,255,0),2)
        cv2.imshow('output', img)
        if FLAGS.output:
            out.write(img)
            frame_index = frame_index + 1
            list_file.write(str(frame_index)+' ')
            if len(converted_boxes) != 0:
                for i in range(0,len(converted_boxes)):
                    list_file.write(str(converted_boxes[i][0]) + ' '+str(converted_boxes[i][1]) + ' '+str(converted_boxes[i][2]) + ' '+str(converted_boxes[i][3]) + ' ')
            list_file.write('\n')

        # press q to quit
        if cv2.waitKey(1) == ord('q'):
            break
    vid.release()
    if FLAGS.ouput:
        out.release()
        list_file.close()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    try:
        app.run(main)
    except SystemExit:
        pass
