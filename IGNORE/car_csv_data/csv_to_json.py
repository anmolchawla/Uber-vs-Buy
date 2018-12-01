import ijson
import json
import io
import csv


csvFiles = ['midsized-car.csv','subcompact-car.csv']

#will be used to store the converted files
objectFiles = []
overallItemCount = 0

#fill array of objects
for filename in csvFiles:
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0

        for row in csv_reader:
            print(row)
            if line_count == 0:
                first = True
                for item in row:
                    if first:
                        first = False
                        continue
                    else:
                        temp = {}
                        temp["name"] = item
                        objectFiles.append(temp)
            else:
                itemCount = 0
                name = ""
                for item in row:
                    if itemCount == 0:
                        name = item
                    else:
                        if item == '':
                            item = '0'
                        objectFiles[overallItemCount + itemCount-1][str(name)] = int(item)
                    itemCount+=1
            line_count+=1
        overallItemCount = overallItemCount + itemCount - 1
        
#fill the rest of the years if it does not exist
#alignment of data
for obj in objectFiles:
    for year in range(1973,2018):
        if str(year) not in obj:
            obj[str(year)] = 0

#json dumps
dumpsFile = []
with open('data123.json','w') as outfile:
    for a in objectFiles:
        json.dump(a,outfile,indent=3)



