import json 

with open('/Users/Nadimkabir/Documents/Park-Me/Park-Me/Park-Me/src/Data/CarModels.json') as f: 
 model = json.load(f)

with open('/Users/Nadimkabir/Documents/Park-Me/Park-Me/Park-Me/src/Data/CarMake.json') as f:
 make = json.load(f)

for m in model:
 print(m[brand], "\n")

#print("\nmake: ", make, "\n\n")
#print("\nmodel: ", model, "\n\n")


#for i in range(len(model)):
# if(make[i] != model[i]):
#   print("make: ", make[i], "model: ", model[i])
 

