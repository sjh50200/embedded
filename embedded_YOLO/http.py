import requests, json
import threading, time
import datetime
def comm(n=3):
    url = "http://223.131.2.220:1818/trackingInfo"
    re_car_info = str(None)
    re_car_position = str(None)
    re_ac_time = str(None)
    re_car_color = str(None)
    accident = []
    accident_string = str(None)
    #차종 색깔 진행경로 시간
    while True:
        f1 = open('C:/Users/Kim/repos/yolov3_deepsort/report1.txt', 'r')
        tempFile1 = f1.read().split() 
        for i in tempFile1:
            accident = tempFile1
        f1.close()
        if len(accident) == 5:
            accident_string = accident[3] + accident[4]
            accident_string = datetime.datetime.strptime(accident_string, '%Y-%m-%d%H:%M:%S.%f')
            accident_string = accident_string.strftime('%Y-%m-%d %H:%M:%S')
        if re_car_info == accident[0] and re_car_position == accident[1] and re_car_color == accident[2] and re_ac_time == accident_string: #차량 사고판단
            continue
        elif re_car_info != accident[0] or re_car_position != accident[1] or re_car_color != accident[2] or re_ac_time != accident_string:
            print(accident_string)
            re_car_info = accident[0]
            re_car_position = accident[1]
            re_car_color = accident[2]
            re_ac_time = accident_string
            def myconverter(o):
                    if isinstance(o, datetime.datetime):
                        return o._str_()
            acc = {'Content-Type': 'application/json; charset=utf-8'}
            param = {
                  'carType' : accident[0],
                  'color' : accident[1],
                  'direction' : accident[2],
            }
            param['time'] = accident_string
            respone = requests.post(url, headers=acc, data=json.dumps(param, default = myconverter))
        time.sleep(n)


thread = threading.Thread(target=comm)
thread.start()
