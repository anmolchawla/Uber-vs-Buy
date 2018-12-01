import ijson
import json
import io

filename = 'data1.json'
outputfile = 'new_data.json'
jsonObjects = []

jsonFile = open(filename)
data = json.load(jsonFile)

for obj in data:
    arrayName = obj["name"].split()
    obj["brand"] = arrayName[0]
    obj["model"] = ' '.join(arrayName[1:])
    if(obj["electric"] == True):
        obj["service"] = 8439 * 0.0506
    elif(obj["segment"] == "car"):
        if(obj["size"] == "compact" or obj["size"] == "subcompact"):
            obj["service"] = 6354 * 0.0506
        elif(obj["size"] == "midsized"):
            obj["service"] = 8171 * 0.0506
        elif(obj["size"] == "large"):
            obj["service"] = 9399 * 0.0506
    elif(obj["segment"] == "suv"):
        if(obj["size"] == "compact" or obj["size"] == "subcompact"):
            obj["service"] = 7606 * 0.0506
        elif(obj["size"] == "midsized"):
            obj["service"] = 9451 * 0.0506
        elif(obj["size"] == "large"):
            obj["service"] = 10054 * 0.0506
    elif(obj["segment"] == "minivan"):
        obj["service"] = 9146 * 0.0506
    elif(obj["segment"] == "truck"):
        obj["service"] = 10054 * 0.0506
    else:
        print(obj["segment"])
        print(obj["size"])


with open(outputfile, 'w') as outfile:
    json.dump(data, outfile,indent=4)


