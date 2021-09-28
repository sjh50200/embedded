import RPi.GPIO as GPIO
import time
import alarm as alarm
import send as send

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
time.sleep(1)

while True:
	result = GPIO.input(23)
	if result == 1:
		print("충격이 감지 되었습니다.")
		alarm.webSend()
		print("Send Accident Information To Web Server...")
		alarm.mobileSend()
		print("Send Accident Information To Application Server...")
		send.videoSend()
		print("Send Recent Video To Yolo3 Server...")
		time.sleep(5)
	else:
		print("진동이 없습니다.")
		time.sleep(1)
