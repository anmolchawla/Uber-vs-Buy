### 1. The core idea behind the project is to help a user decide between buying a car or taking an uber for his commuitng needs. 
### Audience
  - The first audience are those who are debating whether to buy a car but are unsure about what kind of car to buy, or if to buy anyone at all considering Uber/Lyft. 
  - Our second audience are those just generally interested in the automobile market trends. 
### 3. We understood there are many factors affecting the decision and hence we identified these. 
  i. The brand and model of the car.
  ii. The enviromental friendliness of the car. 
 iii. The cost associated with the car. 
 iv. The distance of the to and fro for the most frequent travel. 
  v. The associated Uber cost. 
### 4. We created a web app, that byfollowing these for core ideas. 
  i.  Market study.
  ii. EV market exploration.
  iii. Starting and Stopping destination duration and cost of Uber. 
  iv. Using the algorithm to suggest a recommendation of Uber or buy.
### 5. Market Exploration 
The market exploration , the Uber analysis and the finally a wholsome picture of the cost- benefit analysis of each and every feature extracted from the process.
### 6. Everyone participated in all aspects of the project.
  i. David and Dubem - Data Gathering.
  ii. Anmol - Angular and Web Layout and frame work setup. 
  iii. David - Step 1 and visualization. 
  iv. Anmol - Uber and Google api interaction. Step 4
   v. David and Anmol - Step 2  - Visulaization. 
  vi. Dubem - step 3
  vi. Anmol, Dubem, David - Step 5 and CSS styling, video, documentation.
### 7. Provenance
Our data was sourced from carsalesbase.com where we used python to crawl the web for car brand/model sales per year. Also, we got fuel eeconomy data from fueleconomy.gov and the electric charging stations in US data was sourced from www.afdc.energy.gov  
### 8. Google API & Uber API 
The Google cutom search api was used to display the image of the selcted car to give visual element to the user's query. 
Google's map api was used to diplay a map and allow the user to copy the exact address of his start and end location. 
Googl's Geo Location api was used to hit Uber's ride fare api to calculat the uber options and thier respective fare's for the selected location. 
### 9.  Different factors for the algorithm were taken into consideration
Like cost for buying the car, the insurance of the car, the servicing cost of the car, the miles per gallon of the car. simillarly the Uber's selection like Uber Lux, Pool , Black etc.. and their respective prices were taken into account.
### 10. Past Products
Other products exist that help the users decide between risesharing or buying a car but we differ because we take a step further to analyze the current market and from that help the user make up-to-date decisions.
### 11. Buy vs. Rent NY 
The intutuion of the project was inspired by a new your article on their website, which helped people decide wether they should rent a house or buy a house.  The article gave an interactive control to the user by making them toggle years or budget. 
### 12. Three phases of the user's decision cycle were taken into account
The market exploration , the Uber analysis and the finally a wholsome picture of the cost- benefit analysis of each and every feature extracted from the process.
### 13. Storytelling with data visualization
Our project, as we have explained is a tool to help users make calculated decisions and as such we have structured our website in a matter that flows from Step-1 through to Step-5. Our visualizations help build a story.
### 14. Hierachical Data
Our data has been preprocessed to be hierachical. Therefore giving us a change to implement drill down functionality in our charts.
### 15. Horizontal bar chart - 
is indicative of the drill down ability of the user to sort by ascending, descending and alphabetically arrange transportation segment or even filter it by price, mpg or sales. Clicking on the chart allows for a drill down and further exploration. 
### 16. EV  Map - Market exploration for electric vehicles was done through two chart
 i. Lollipop Chart - The height of the bars are indicative of the range the cars travel on a single charge. After the car selection. 
ii. The dot map of US shows the EV charging staions in the country and the radius of the circles are indicative of the range of selected cars. 
### 17. Summary
The last step will give the final recomendation for the user. It will start by iterating over all the choices of the user (i.e the options selected in the previous steps) and then create a waterfall barchart to display the infliction point between buying a car or renting an uber. The user also gets to toogle the pointer to recalcuate his recomendation and savings.
### 18. Development Stack
The following technologies were used - Angular, Bootstrap, JQuery, JavaScript, HTML, CSS, UBER (Fair estimates)and Google API (Custom search for cars, Geo map for map, Geo Location for destinations).
### 19. Things to do differently
If given more time, try to scale up to implement visualization for more countries e.g. China, Brazil and India. Also add more ride sharing options e.g Ola, Taxify, Lyft etc 
### 20. Thank you
