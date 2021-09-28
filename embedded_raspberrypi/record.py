import os
import numpy as np
import cv2
import time
import datetime
cap = cv2.VideoCapture(0) #For Laptop Camera (Change to 1,2,3 if other cams attached)
while(True):
    print("Delete recent video")
    os.system('rm 2021*')
    ret, frame = cap.read()
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    date_string = datetime.datetime.now().strftime("%Y-%m-%d  %I.%M.%S%p   %A")
    print("Recording "+date_string+"...")
    out = cv2.VideoWriter(date_string+'.avi',fourcc, 30.0, (640,480))
    out.write(frame)
    cv2.imshow('frame',frame)
    time.sleep(30)
#    key=cv2.waitKey(1)
cap.release()
out.release()
cv2.destroyAllWindows()
