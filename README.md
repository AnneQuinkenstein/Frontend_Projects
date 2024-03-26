# Projects

This Webpage helps you to organize your projects in a simple way. 

![Startframe Projectswebsite](https://imgur.com/CmbSWTy.png)

You need to Login or Register before you can use the website.
If you are not logged in, you will be redirected to a table of projects. 
![Projects](https://imgur.com/KcHdPq9.png)
The filter method is used to filter the projects in any aspect.
You can also create a new project by applying the mandatory project-name and optional all of the other fields and clicking on the "add" button.
Delete and update a project works clicking with the corresponding buttons.

The datamodel of the projects-webpage is shown below:
![SQL Data](https://imgur.com/2OEvyOV.png)

For each Projects there are none or more Milestones. If you click on a Milestone, you will be redirected to the Milestone page.
![Milestones](https://imgur.com/LkySAEq.png)

The header shows you the Milestonename and the Status ("todo", "in progress", "done").
The Table beneath shows you the next Steps of the Milestone. You can filter the Steps by any aspect. 
For each Step there is one or more responsibe Person wich is shown in the last column. 

Todo: CUD for Steps (and mark done) and UD for Milestones, apply participate to Projects.


## Technical Contents
- [Prerequisites](#prerequisites)
- [Development Server](#development-server)
- [Deployment](#deployment)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js: ^18.13.0 || ^20.9.0
- Angular CLI: version 17.0.x
- PostgreSQL: 13.4
- npm: ^18.13.0 || ^20.9.0

## Development Server
To set up the development server, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your/repository.git

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
