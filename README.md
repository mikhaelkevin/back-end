<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">JOSHY API</h3>

  <p align="center">
    <a href="https://github.com/mikhaelkevin/be-lets-cookin-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/mikhaelkevin/be-lets-cookin-app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
    <li><a href="#db-structure">DB Structure</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#our-team">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

**Let's Cookin** is a food lover website that help the user to find their recipe. Also, they can contribute as creator to share their own recipe for people who wants try it.
Beside of only to find what they want, this application also give the user newest information about the popular food or the newest food added. So, we hope it will help the user to grow.

### Built With

This app was built with some technologies below:

- [Javascript](https://www.javascript.com/)
- [ExpressJS](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Before going to the installation stage there are some software that must be installed first.

- [NodeJs](https://nodejs.org/en/download/)
- [Postman](https://www.postman.com/downloads/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

If you want to run this project locally, I recommend you to configure the <a href="#setup-env">.env</a> first before configuring this repo front-end.

- Clone the repo

```
git clone https://github.com/mikhaelkevin/joshy-back-end/tree/deployment
```

- Go To Folder Repo

```
cd joshy-back-end
```

- Install Module

```
npm install
```

- <a href="#setup-env">Setup .env</a>

Before you start the backend, make sure check the application db backup and find a file named <b>db_binary.psql</b>. If you can't found any, you can make it by your own references to application <a href="#db-structure">DB Structure</a>.

Follow the other step bellow to continue settings up the application.

- Open CLI
- Get in to your database

```
psql postgres postgres
```

<i>Note: you can use your own way to get in to psql</i>

- Create new database

```
create database db_binary
```

- Import database

```
psql -U postgres -p 5432 -h localhost -d db_binary.psql -f db_binary.psql.psql
```

<i>Note: you can use your own way to import the database</i>

- Import our [API Documentation](https://documenter.getpostman.com/view/13579110/VUxLwoTN) on Postman (change the base url if you want use it on local)
- After all the step is done you ready to go
- Open the backend folder with your IDE
- Open the IDE terminal and run command below

```
nodemon
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example

Rename file called .env.example to .env and change exampl value to your own configs.

```
LOCAL_PORT=example

DB_USER=example
DB_HOST=example
DB_NAME=example
DB_PASSWORD=example
DB_PORT=example

PRIVATE_KEY=example

NOTE:
maybe some features wont run in local.
if you want to run full features you can use our web services url as the base url.
the reason we say this is because our local env file have a credential data that we can't share.
```

<p align="right">(<a href="#top">back to top</a>)</p>

## DB Structure

<p align="center" display=flex>
   
<table>
<tr>
    <td style='text-align: center; background-color: #6661; font-weight: 600'>JOSHY database structure</td>
  </tr>
  <tr>
    <td><image src="https://res.cloudinary.com/nocturncloud/image/upload/v1662409726/joshy-app/README/db_dmf269.png" alt="login" width=100%></td>
  </tr>
</table>
      
</p>
<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b someFeature-features`)
3. Commit your Changes (`git commit -m 'add(someFeature): what kind of feature'`)
4. Push to the Branch (`git push origin someFeature-features`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Related Project

<center>
<table> 
    <tr>
    <th>Backend</th>
    <th>Frontend</th>
    <th>Web Services</th>
    <th>API </th>
    </tr>
    <tr>
    <td>
    <a href="https://github.com/mikhaelkevin/joshy-back-end/tree/deployment"> 
    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="be-github"/>
    </a>
    </td>
    <td> 
    <a href="https://github.com/aldoBangun/joshy-app/tree/main"> 
    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="fe-github">
    <a/>
    </td>
    <td> 
    <a href="#"> 
    <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white" alt="web-services">
    <a/>
    </td>
    <td> 
    <a href="https://documenter.getpostman.com/view/13579110/VUxLwoTN"> 
    <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="postman">
    <a/>
    </td>
    </tr>
</table>
</center>

<p align="right">(<a href="#top">back to top</a>)</p>

## Our Team

<center>
  <table>
  <tr>
  <th colspan=5>
    <b>JOSHY APP TEAM</b>
  </th>
  </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/mikhaelkevin">
          <img width="100" src="https://avatars.githubusercontent.com/u/102899084?s=400&u=618d13a4fa77ad80e7a2cb9349c250aef1be6e2f&v=4" alt="kevin"><br/>
          <sub><b>Mikhael Kevin</b></sub> <br/>
          <sub>Project Leader | Backend Dev</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/aldoBangun">
          <img width="100" src="https://avatars.githubusercontent.com/u/58449615?v=4" alt="aldo"><br/>
          <sub><b>Aldo Bangun</b></sub> <br/>
          <sub>Frontend Dev</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/Jafarammer">
          <img width="100" src="https://avatars.githubusercontent.com/u/73752464?v=4" alt="jafar"><br/>
          <sub><b>Jafar Ammer</b></sub> <br/>
          <sub>Frontend Dev</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/rahimatunnimah">
          <img width="100" src="https://avatars.githubusercontent.com/u/59507749?v=4" alt="nimah"><br/>
          <sub><b>Rahimatun Ni'mah</b></sub><br/>
          <sub>Backend Dev</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/VerdyNordsten">
          <img width="100" src="https://avatars.githubusercontent.com/u/51946708?v=4" alt="verdy"><br/>
          <sub><b>Verdy</b></sub> <br/>
          <sub>Frontend Dev</sub>
        </a>
      </td>
    </tr>
  </table>
</center>

## License

Distributed under the [MIT](/LICENSE) License.

<p align="right">(<a href="#top">back to top</a>)</p>
