import json, requests
import datetime

mobileUrl="http://14.53.49.163:9000/accident"
webUrl="http://223.131.2.220:1818/accidentLocation"
date_string = str(datetime.datetime.now())
date_string=datetime.datetime.strptime(date_string, '%Y-%m-%d %H:%M:%S.%f')
date_string= date_string.strftime("%Y-%m-%d %H:%M:%S")
appData = {"alarm": "True","mapX":37.4763121,"mapY":126.9021}
def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o._str_()
webData = {'Content-Type': 'application/json; charset=utf-8'}
param={"mapX":"37.4763121","mapY":"126.9021",}
jsonData = json.dumps(param)

def mobileSend():
    res=requests.post(mobileUrl,json=appData)
    print("Status Code = ",res.status_code)
def webSend():
    res=requests.post(webUrl,headers=webData,data=jsonData)
    print("Status Code = ",res.status_code)
