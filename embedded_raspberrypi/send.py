import requests

def videoSend():
    files = [('file', open('recordedVideo.mp4', 'rb'))]
    res=requests.post('http://1f89-125-128-27-118.ngrok.io/video', files=files)
