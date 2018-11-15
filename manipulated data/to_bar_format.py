# moving data into the form for the bar chart

import json

#top category: segment
top_categories = []
id_category = 0 

with open('data.json', 'r') as infile:
    objects = json.loads(infile.read())
    for obj in objects:
        flag = False
        for cat in top_categories:
            if(obj["segment"] == cat["category"]):
                #sum information at segment level
                cat["sales"] = cat["sales"] + obj["2017"]
                cat["cost"] = cat["cost"] + obj["msrp"]
                cat["mpg"] = cat["mpg"] + obj["mpg"]
                #now need to check if size exists --> add if so
                size_flag = False
                for size_cat in cat["categories"]:
                    if(obj["size"] == size_cat["category"]):
                        #sum information at size level
                        size_cat["sales"] = size_cat["sales"] + obj["2017"]
                        size_cat["cost"] = size_cat["cost"] + obj["msrp"]
                        size_cat["mpg"] = size_cat["mpg"] + obj["mpg"]
                        size_flag = True
                        #create personal obj to append to child cat
                        temp = {}
                        temp["sales"] = obj["2017"]
                        temp["cost"] = obj["msrp"]
                        temp["mpg"] = obj["mpg"]
                        temp["category"] = obj["name"]
                        temp["id_category"] = str(id_category)
                        size_cat["categories"].append(temp)
                        id_category = id_category + 1
                        break
                if(not size_flag):
                    #means that this is not in the first child dictionary
                    top_temp = {}
                    top_temp["sales"] = obj["2017"]
                    top_temp["cost"] = obj["msrp"]
                    top_temp["mpg"] = obj["mpg"]
                    top_temp["category"] = obj["size"]
                    top_temp["id_category"] = str(id_category)
                    id_category = id_category + 1
                    #make first child category
                    temp = {}
                    temp["sales"] = obj["2017"]
                    temp["cost"] = obj["msrp"]
                    temp["mpg"] = obj["mpg"]
                    temp["category"] = obj["name"]
                    temp["id_category"] = str(id_category)
                    top_temp["categories"] = [temp]
                    cat["categories"].append(top_temp)
                    id_category = id_category + 1
                flag = True
                break
        if(not flag):
            #means that this is not in the parent dictionary
            top_temp = {}
            top_temp["sales"] = obj["2017"]
            top_temp["cost"] = obj["msrp"]
            top_temp["mpg"] = obj["mpg"]
            top_temp["category"] = obj["segment"]
            top_temp["id_category"] = str(id_category)
            id_category = id_category + 1
            #make first child category
            second_temp = {}
            second_temp["sales"] = obj["2017"]
            second_temp["cost"] = obj["msrp"]
            second_temp["mpg"] = obj["mpg"]
            second_temp["category"] = obj["size"]
            second_temp["id_category"] = str(id_category)
            id_category = id_category + 1
            #make second child category
            temp = {}
            temp["sales"] = obj["2017"]
            temp["cost"] = obj["msrp"]
            temp["mpg"] = obj["mpg"]
            temp["category"] = obj["name"]
            temp["id_category"] = str(id_category)
            id_category = id_category + 1
            #nest all and send
            second_temp["categories"] = [temp]
            top_temp["categories"] = [second_temp]
            top_categories.append(top_temp)
            #id_category = id_category + 1
    #now that it is all through, change cost to string
    for cat in top_categories:
        cat["cost"] = str(cat["cost"])

with open('data_bar.json', 'w') as outfile:
    for data in top_categories:
        json.dump(data, outfile,indent=4)
            
