# Buy vs. Uber:
A visual decision tool based on analysis of today's vehicle market

## Table of Content
  - Project Summary
  - Project Information
  - Project Artifacts
  - Provenance
  - Step 1: 
  - Step 2:
  - Step 3:
  - Step 4:
  - Step 5:
  - Challenges
  - Conclusion

## PROJECT SUMMARY
Since the rise of ridesharing services as a viable means of urban transport, there has been a steady increase in annual revenue in the industry - a direct statement of its impact. According to [statista](https://www.statista.com/outlook/368/109/ride-hailing/united-states), the ridesharing industry is expected to show an annual growth rate of 11.0%, resulting in a market volume of US$26,315m by 2023. This leaves the question of whether owning a car is as essential as it used to be. With **Buy vs. Uber**, we seek to help the user make the decision between committing to a car for a stimupulated period of time versus using a ride sharing service i.e. Uber. We help the user through easy to understand, yet insightful visualizations of the car market based on groups such as:

  - Segment: Car, Minivan, SUV, Truck
  - Size: Compact, Large, Mini, Midsized, Subcompact
  - Brand: Toyota, Honda, Chevrolet, Mercedes Benz, BMW etc
  - Model: Camry, MDX, Focus, Malibu etc.
  
  **NOTE**: We have a dedicated page for electric vehicles (EV), as the metric for these type of vehicles differ from gas-powered vehicles.
  
Armed with this information, and an Uber API estimate of the average cost per week based on user ride input, a clear conclusion can be drawn.
  
**NOTE**: For simplicity, we assume a five-day work-week structure i.e. 10 Uber rides per week and have implemented our calculations based on this assumption.
  

### PROJECT INFORMATION

- Project title: Buy Versus Uber: A Visual Decision Tool Based on Analysis of Today's Vehicle Market
- Group name: Hat Trick
- Team names: [ Anmol Chawla ] (anmolcha@usc.edu) [Chukwudubem Nwoji] (nwoji@usc.edu) [David Goodfellow] (dgoodfel@usc.edu)

### PROJECT ARTIFACTS

- [Demonstration URL](<demo-url>)
- [Presentation PDF](<presentation-pdf-url>) and [transcript](<presentation-transcript-md-url>)
- [Article](https://github.com/INF554Fall18/project-hat-trick/blob/master/Docs/Buy_Versus_Uber_A_visual_decision_tool_By_HatTrick.pdf) and [Overleaf URL](https://www.overleaf.com/8291586897msqjkjbhgrns?fbclid=IwAR0Vv_5a83W1EpsFUeiETvAIDJ_44_CzpB68Qw_Wb4LElLudb2p-UykxqHc)
- [YouTube video](<youtube-video-url>)


## To Run Sozi.html

1. Clone the repository
2. Ensure you are running node.js by downloading it and moving it to your working directory. https://nodejs.org/en/download/
3. Make sure it is correctly installed by running 'node --help'. It is properly installed if the usage documentation is shown.
4. To test, have a real time synced page through installing and activated Browsersync through Node's Package Manager (NPM). 'npm install browser-sync -g'
5. Activate browsersync in your working directory. 'browser-sync start --server'
6. go to the url: http://localhost:3000/554Proposal.sozi.html

## Slide Details

#### Slide 1. Introduction

- In our project, we aim to help visualize the car market and, based on your car of choice, whether it is better for you to buy your car or use ride services
- "Buy vs. Uber"

#### Slide 2. Overview

- The car market has been going through a fundamental shift with the disruption of shared economy services like Uber and Lyft as well as with EVs. 
- This project will do two things. 
  - One, explore the changes in car sales due to this (filters by brand, car type, gas mileage, and expected yearly cost). This will help the user gain a stronger grasp on current market trends.
  - Two, based on your average daily commute and car you expect to buy, it will do a comparison to help you decide whether it would be better for you to uber instead of owning a car. 
- Our inspiration came from the famous "Buy vs. Rent" visualization from the New York Times for a home

#### Slide 3. Audience

- The first audience are those who are debating whether to buy a car but are unsure about what kind of car to buy, or if to buy anyone at all considering Uber/Lyft. 
- Our second audience are those just generally interested in the automobile market trends. 

#### Slide 4. Data Sources

- Our car sales data will come from [carsalesbase.com](http://carsalesbase.com/). This provides monthly information for sales for car brands, car types, and by model.
- Our fuel efficiency data will come from [fueleconomy.gov](https://www.fueleconomy.gov/)
- The Uber prices will come via the [Uber API](https://developer.uber.com/)

#### Slide 5. Market Exploration Aspect

- Many visualizations exist for the car market but they are often not fully integrated across the market
- Some will focus on sales per brand, some will focus on gas mileage, and others will focus on the rise of EVs
- We aim to bring these different aspects together in our visualizations to allow the user to fully explore the market and gain insight into trends and specific information

#### Slide 6. Buy vs. Uber Aspect

- The "Rent vs. Buy" in the NYT allowed the users to interactively choose a variety of parameters including how long they plan to live in the house and the house price
- This helped users gain more personalized action from the data
- We plan to employ similar features to allow users to choose how long they expect to own the car and other factors
-The visualization for the NYT also showed a breakdown of the expected cost which we plan to use as well for servicing and gas estimates.

#### Slide 7. Use & Importance

- It allows users to drill down to a deep level in exploring the automobile market on multiple different facets, including but not limited to EV/Gas, Mileage, Model, Brand, & Type.
- Moreover, it helps the user decide whether to buy a car or just to Uber. This makes it actionable.

#### Slide 8. Interactive Visuals

- For market exploration, drill down functionality will be the biggest interactive feature. We will employ this on both our novel and familiar visuals.
- For the Uber vs Buy question, dragging features will be used to interact and personalize for the user.

#### Slide 9. Design Considerations "Uber vs. Buy"

- We need to be especially conscious of how we break up our information. We have two separate data components: the automobile market information and the uber ride data. We want to make sure they don't cause the user to be confused in the interface. We would like them to be able to use the app intuitively. 
- To do this we need keep them fairly isolated from one another in the presentation to the user
- For the uber design, we want to make sure the model is explanable. This means that we have the breakdowns listed on the side and keep the visualizations familiar.

#### Slide 10. Design Considerations "Car Market"

- For the car market, many familiar visualizations are already in existence. We do not want to sacrifice the benefits of familarity, but we also want to couple these with more unique visualizations which could generate new insights for the user.
- However, including both of these can be confusing for the user, so we want to be careful in how we lay out our visualizations and make it intuitive for the user to navigate.

#### Slide 11. Competition

- Many of the data sources we use are not competition to us because they are isolated in a smaller aspect of our overall goal.
  - I.e. Uber and its API for pricing, gas mileage ratings in order to sell a car
- There is an application that goes into whether you should own a vehicle or not. However, our advantage to the user over them is that their application makes the user input a bunch of small variable information that they themselves need to gather. 
- In short, it is not car specific where we can extrapolate this information automatically for them.

#### Slide 12. Deliverables

- Our deliverables are broken up into 5 subgroups
- Subgroup A: Data preprocessing. This means merging certain information together in a singular DB and cleaning the data.
- Subgroup B: Car Market Visualizations. Use this data to create both the familiar and novel visualizations.
- Subgroup C: Uber API Integration. 
- Subgroup D: Buy vs. Uber visualizations with breakdown of costs & savings.
- Subgroup E: Colation/Finishing touches. Creating the CSS, the presentation youtube video, and hosting the application.

#### Slide 13. Tech Stack

- D3
- JavaScript
- Python for pre-processing
- Uber API
- Node
- HTML & CSS

#### Slide 14. Timeline

- the timeline in the sozi presentation provides good depth but below is a synopsis
- September 26th: Present to class
- October 3rd: Have the database completed (gathered, extracted, & combined)
- October 17th: Car Visualizations Complete
- October 31st: Uber REST API integration complete
- November 14th: Uber vs. Buy visualizations complete
- November 21st: Colation Completed
- November 28th: Project Submitted

#### Slide 15. Team & Thank You

- We will meet every week on Mondays. We will go for at least a 4 hour time period and break up work for the remaining week.
- Thank you!

#### HOSTING INSTRUCTIONS

      ng build --prod --base-href "/~*add link path here*


http://www-scf.usc.edu/~anmolcha/project/
