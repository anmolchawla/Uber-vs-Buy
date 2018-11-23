# moving data into the form for the pie chart

import json

top_categories = []
id_category = 0 

with open('data.json', 'r') as infile:
    objects = json.loads(infile.read())
    for obj in objects:
        flag = False
        for cat in top_categories:
            if(obj["brand"] == cat["category"]):
                cat["cost"] = cat["cost"] + obj["2017"]
                #create personal obj to append to child cat
                temp = {}
                temp["cost"] = str(obj["2017"])
                temp["category"] = obj["model"]
                temp["id_category"] = str(id_category)
                cat["categories"].append(temp)
                id_category = id_category + 1
                flag = True
                break
        if(not flag):
            #means that this is not in the dictionary
            top_temp = {}
            top_temp["id_category"] = str(id_category)
            top_temp["cost"] = obj["2017"]
            top_temp["category"] = obj["brand"]
            id_category = id_category + 1
            #make first child category
            temp = {}
            temp["cost"] = str(obj["2017"])
            temp["category"] = obj["model"]
            temp["id_category"] = str(id_category)
            top_temp["categories"] = [temp]
            top_categories.append(top_temp)
            id_category = id_category + 1
    #now that it is all through, change cost to string
    for cat in top_categories:
        cat["cost"] = str(cat["cost"])

with open('data_pie.json', 'w') as outfile:
    for data in top_categories:
        json.dump(data, outfile,indent=4)
            
