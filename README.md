# Projects

This Webpage helps you to organize your projects in a simple way. 

Frontend is deployed on [Vercel](https://vercel.com) &
Backend is deployed on [Render](https://render.com/)

Take a [look 👀](https://frontend-projects-sandy.vercel.app/)

Please note that this project uses the free instance of [Render](https://render.com/) for Backend and Database. There might be delays due to inactivity-induced instance spin-down. Keep this in mind when accessing the deployed application. It's recommended to [trigger](https://backend-projects-8pai.onrender.com)  the Backend before taking a look at the website the first time. 

![Startframe Projectswebsite](https://imgur.com/CmbSWTy.png)

You need to Login or Register before you can use the website.
If you are logged in, you will be redirected to a table of projects. 
![Projects](https://imgur.com/KcHdPq9.png)
The filter method is used to filter the projects in any aspect.

You can also create a new project by applying the mandatory project-name and optional all of the other fields and clicking on the "add" button.

Delete and update a project works clicking the corresponding buttons.

To understand the structure please take look at the datamodel which is shown below:
![SQL Data](https://imgur.com/2OEvyOV.png)

For each Projects there are none or more Milestones. If you click on a Milestone, you will be redirected to the Milestone page.
![Milestones](https://imgur.com/LkySAEq.png)

The header shows you the Milestonename (frontend in this case) and the Status ("todo", "in progress", "done").
The Table beneath shows you the next Steps of this Milestone. You can filter the Steps by any aspect. 
For each Step there is one or more responsibe Person wich is shown in the last column. 

Todo: CUD for Steps (and mark done) and CUD for Milestones, apply participate to Projects.


## Technical Contents
- [Prerequisites](#prerequisites)
- [Development Server](#development-server)
- [Deployment](#deployment)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- npm: ^18.13.0 || ^20.9.0
- Node.js: ^18.13.0 || ^20.9.0
- Angular CLI: version 17.0.x
- Express [Backend](https://github.com/AnneQuinkenstein/Backend_Projects)
- and PostgreSQL - Server

## Development Server
To set up the development server, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your/repository.git
    ```
   ```bash
   cd project-directory
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   ng serve
   ```

5. Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/).

The application will automatically reload if you make any changes to the source files.

## Deployment

To deploy the project, follow these steps:

1. Build the project:

   ```bash
   ng build
   ```

2. Deploy the generated files to your server or hosting platform.
