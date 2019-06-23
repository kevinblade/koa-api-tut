# Tutorial for using GraphQL in Koa framework and with Jwt (JSON Web Token)

* Preparations<br />
  \- MongoDB: For easy install mongodb with docker-compose I prepared docker-compose.yml file in this project root folder.<br />
  ```
  $ cd <The directory contains docker-compose.yml file, in this case, koa-api-tut.>
  $ docker-compose up -d ---build
  ```

* Setup and test<br />
  \- Download the source code from the github as follows.
  ```
  # Download sources from the github.
  $ git clone https://github.com/kevinblade/koa-api-tut.git

  # Change directory into this project folder.
  $ cd koa-api-tut

  # Install MongoDB container
  $ docker-compose up -d --build

  # You must change API_SECRET in the .env.* files.

  # For production environment.
  $ cp .env.sample .env

  # For development environment.
  $ cp .env.sample .env.development

  # Install packages.
  $ yarn

  # Run server.
  $ yarn start
  ```
  \- Open a browser with url as http://localhost:4000/graphql then you can use the playground app.<br />
  \- Run mutaion code in the playground as follow
  ```
  mutation {
    signUp(email: "Your email", password: "Your password") {
      _id
      email
    }
  }
  ```
  \- After signUp, run query as follow and then copy a token from the response result.<br />
  \- This token will be expired after 1 year or retry signIn with the same user.
  ```
  {
    signIn(email: "Your email", password: "Your password")
  }
  ```
  \- Register the token into "HTTP HEADERS" at the bottom left in the playground as follow.
  ```
  {
	"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkMGY3ZTJhNWE0ZWQ3MTI3NzJhMGM1YyIsImVtYWlsIjoia3dhbmdqZTFAZ21haWwuY29tIn0sImlhdCI6MTU2MTMwMDgzMywiZXhwIjoxNTkyODU4NDMzfQ.v2mKvEJJpxKbt9pAF7NaySvmX5j6NurVrWMgrVTAgAQ"}
  ```
  \- Now you can queries with authorization as follows.
  ```
  {
    posts {
      title
      text
    }
  }
  ```