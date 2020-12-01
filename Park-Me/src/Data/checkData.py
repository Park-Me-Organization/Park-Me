import json 

with open('/Users/Nadimkabir/Documents/Park-Me/Park-Me/Park-Me/src/Data/CarModels.json') as f: 
 model = json.load(f)

with open('/Users/Nadimkabir/Documents/Park-Me/Park-Me/Park-Me/src/Data/CarMake.json') as f:
 make = json.load(f)

#for i in range(len(model)):
# print(model[i], "\n\n\n\n\n")

print(model[0]['models'])
#print("\nmake: ", make, "\n\n")
#print("\nmodel: ", model, "\n\n")


#for i in range(len(model)):
# if(make[i] != model[i]):
#   print("make: ", make[i], "model: ", model[i])
 

