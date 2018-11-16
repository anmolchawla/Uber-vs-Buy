# used for line graph

# moving data into the form for the bar chart

import json

#top category: segment
top_categories = []
id_category = 0 

def create_values(obj):
    values = []
    for year in range(1973,2018):
        temp = {}
        temp["date"] = str(year)
        temp["sales"] = obj[str(year)]
        values.append(temp)
    return values

def update_values(oldObj, newObj):
    for year in range(1973,2018):
        for val in oldObj["values"]:
            if val["date"] == str(year):
                val["sales"] = val["sales"] + obj[str(year)]
                break
    return oldObj["values"]
    

with open('data.json', 'r') as infile:
    objects = json.loads(infile.read())
    for obj in objects:
        flag = False
        for cat in top_categories:
            if(obj["segment"] == cat["category"]):
                #sum information at segment level
                cat["values"] = update_values(cat, obj)
                #now need to check if size exists --> add if so
                size_flag = False
                for size_cat in cat["categories"]:
                    if(obj["size"] == size_cat["category"]):
                        #sum information at size level
                        size_cat["values"] = update_values(size_cat, obj)
                        size_flag = True
                        #create personal obj to append to child cat
                        temp = {}
                        temp["category"] = obj["name"]
                        temp["id_category"] = str(id_category)
                        temp["values"] = create_values(obj)
                        size_cat["categories"].append(temp)
                        id_category = id_category + 1
                        break
                if(not size_flag):
                    #means that this is not in the first child dictionary
                    top_temp = {}
                    top_temp["category"] = obj["size"]
                    top_temp["id_category"] = str(id_category)
                    top_temp["values"] = create_values(obj)
                    id_category = id_category + 1
                    #make first child category
                    temp = {}
                    temp["category"] = obj["name"]
                    temp["id_category"] = str(id_category)
                    temp["values"] = create_values(obj)
                    top_temp["categories"] = [temp]
                    cat["categories"].append(top_temp)
                    id_category = id_category + 1
                flag = True
                break
        if(not flag):
            #means that this is not in the parent dictionary
            top_temp = {}           
            top_temp["category"] = obj["segment"]
            top_temp["id_category"] = str(id_category)
            top_temp["values"] = create_values(obj)
            id_category = id_category + 1
            #make first child category
            second_temp = {}
            second_temp["category"] = obj["size"]
            second_temp["id_category"] = str(id_category)
            second_temp["values"] = top_temp["values"]
            id_category = id_category + 1
            #make second child category
            temp = {}
            temp["category"] = obj["name"]
            temp["id_category"] = str(id_category)
            temp["values"] = top_temp["values"]
            id_category = id_category + 1
            #nest all and send
            second_temp["categories"] = [temp]
            top_temp["categories"] = [second_temp]
            top_categories.append(top_temp)
            

with open('data_line.json', 'w') as outfile:
    for data in top_categories:
        json.dump(data, outfile,indent=4)
            
