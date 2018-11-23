import json

#top category: segment
evs = []

with open('data.json', 'r') as infile:
    objects = json.loads(infile.read())
    for obj in objects:
        if "empg" in obj:
            print("electric vehicle")
            ev = {}
            ev["name"] = obj["name"]
            ev["empg"] = obj["empg"]
            evs.append(ev)

print(evs)

with open('electric_vehicles.json', 'w') as outfile:
    for data in evs:
        json.dump(data, outfile,indent=4)
