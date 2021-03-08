# Account Management System 

## Getting Started

### 1: Clone the account management system project (skip if you have done this previously)

From the command line do the following:

```
git clone git@bitbucket.org:mangomap/account-management-system.git
```

### 2: Navigate into the account-management-system directory 

```
cd account-management-system
```

### 3: Make sure you have the newest version

```
git pull
```

### 4: Move to the correct branch for your current Jira task

Replace 'your-branch-name-goes-here' with the correct branch name, this can be copied from your Jira task
```
git fetch
git checkout your-branch-name-goes-here
```

### 5: Start developement server 

```
npm start (wait for around a minute)
```
The command above will create new docker container, start the development server and install alll the dependencies needed to run the project.

### 6: Access the Website

You can access the account page  

[http://localhost:3000/234/account](http://localhost:3000/234/account)
