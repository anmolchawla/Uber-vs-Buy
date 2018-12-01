# Buy vs. Uber:
A visual decision tool based on analysis of today's vehicle market

## Table of Content
  - Project Summary
  - Project Information
  - Project Artifacts
  - Provenance
  - Design Considerations
  - Step 1: Market Eploration
  - Step 2: Electric Vehicle Range
  - Step 3: Car Selection
  - Step 4: Uber Cost
  - Step 5: Uber vs. Buy
  - Development Stack
  - Challenges Faced
  - Conclusion

## PROJECT SUMMARY
Since the rise of ridesharing services as a viable means of urban transport, there has been a steady increase in annual revenue in the industry - a direct statement of its impact. According to [statista](https://www.statista.com/outlook/368/109/ride-hailing/united-states), the ridesharing industry is expected to show an annual growth rate of 11.0%, resulting in a market volume of US$26,315m by 2023. This leaves the question of whether owning a car is as essential as it used to be. 

With **Buy vs. Uber**, we seek to help the user make the decision between committing to a car for a stimupulated period of time versus using a ride sharing service i.e. Uber. We help the user through easy to understand, yet insightful visualizations of the car market based on groups such as:

  - Segment: Car, Minivan, SUV, Truck
  - Size: Compact, Large, Mini, Midsized, Subcompact
  - Brand: Toyota, Honda, Chevrolet, Mercedes Benz, BMW etc.
  - Model: Camry, MDX, Focus, Malibu etc.
  
Armed with this information, and an Uber API estimate of the average cost per week based on user ride input, a clear conclusion can be drawn.
  
**NOTE**: We have a dedicated page for electric vehicles (EV), as the metric for these type of vehicles differ from gas-powered vehicles.  
**NOTE**: For simplicity, we assume a five-day work-week structure i.e. 10 Uber rides per week and have implemented our calculations based on this assumption.
  

### PROJECT INFORMATION

- Project title: Buy Versus Uber: A Visual Decision Tool Based on Analysis of Today's Vehicle Market
- Group name: Hat Trick
- Team names: [ Anmol Chawla ] (anmolcha@usc.edu) [Chukwudubem Nwoji] (nwoji@usc.edu) [David Goodfellow] (dgoodfel@usc.edu)

### PROJECT ARTIFACTS

- [Demonstration URL](https://inf554-d9e3c.firebaseapp.com/)
- [Presentation PDF](https://github.com/INF554Fall18/project-hat-trick/blob/master/Docs/Presentation_Buy_vs_Uber.pdf) and [transcript](https://github.com/INF554Fall18/project-hat-trick/blob/master/Docs/PRESENTATION_TRANSCRIPT.md)
- [Article](https://github.com/INF554Fall18/project-hat-trick/blob/master/Docs/Buy_Versus_Uber_A_visual_decision_tool_By_HatTrick.pdf) and [Overleaf URL](https://www.overleaf.com/8291586897msqjkjbhgrns?fbclid=IwAR0Vv_5a83W1EpsFUeiETvAIDJ_44_CzpB68Qw_Wb4LElLudb2p-UykxqHc)
- [YouTube video](https://www.youtube.com/watch?v=3JZ4T1PWwQE)


### PROVENANCE
We have collated data from multiple sources to give the user a comprehensive visual experience. 
- Our car sales data is sourced from [carsalesbase.com](http://carsalesbase.com/). This provides monthly information for sales for car brands, car types, and by model.
- Our fuel efficiency data is sourced from [fueleconomy.gov](https://www.fueleconomy.gov/). This gives us the miles per gallon of each vehicle.
- The Uber prices were sourced via the [Uber API](https://developer.uber.com/)
- The electric charging stations in US data was sourced from [www.afdc.energy.gov](https://afdc.energy.gov/fuels/electricity_locations.html#/find/nearest?fuel=ELEC)


### DESIGN CONSIDERATIONS
Our ultimate design goal was to have the website be intuitive to new users. This is why we decided to lay out the webpage in five(5) simple left aligned tabs. This creates the flow for the application. 

  - Color schemes are carefully selected to provide every user an equal experience regardless of eye condition.
  - We have centered all visualization to optimize visual query and have left out any distracting background activity that can cause distraction.
  - We also insisted on an interactive experience through the website, to keep the user involved. Animated transistions like drill downs and reordering of chart elements have been implemented.
  - Most of our pages are responsive, making it possible for the website to be view on any device.

### STEP-1: MARKET EXPLORATION
  - Company Market Shares - Drill down donut chart with tooltip for information
  - Automobile Sales Over Time (1973 - 2017) - Drill down line chart with tooltip for information
  - Sales by Category - Drill down bar chart
  
### STEP-2: ELECTRIC VEHICLE RANGE
  - Electric Vehicle Ranges - Lollipop chart
  - EV Stations in USA - Responsive dot map with interactivity

### STEP-3: CAR SELECTION
  - Car Selection - Jquery data handling and Angular Component 
  
### STEP-4: UBER COST
  - Uber Interaction - Uber API & Google API
  - Uber Options vs. Average Cost - Interactive bar chart used to store selection for step-5 computation
  
### STEP-5: UBER VS. BUY
  - Summary
### DEVELOPMENT STACK
- D3
- Angular
- Bootstrap
- JavaScript
- Jquery
- Python for pre-processing
- Google API
- Uber API
- Node
- HTML & CSS

### CHALLENGES FACED
 We encountered a number of challenges in this project:
 1. Data required extensive preprocessing to be functionally useful. We used python for preprocessing data.
 2. Uber API not working. Resolved by using different API key.
 4. Step-4 not displaying when hosted on scf. Migrated to Google Firebase as Uber api has a hard restriction on scf server. 
 3. Angular setup error. Fixed it by troubleshooting one component at a time.
 5. Step-5 not producing results. Solved by recomputing metrics.
 6. Layout not aligned properly. Solved by Bootstrap layout and CSS.
 
### CONCLUSION
To run repository locally, use code:
        
        npm install * --save
        ng build
        
To host on firebase the following steps were followed.
1. Create a firebase account and then npm installed firebase cli on the local host. 
2. Run the normal angular prod command to create the dist files. 
3. Setup firebase hosting service configurations. 

        commands. Firebase login
        firebase init
        firebase --add
        firebase hosting
        firebase deploy </path to dist folder> 
