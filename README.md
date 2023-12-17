# Node.js Elasticsearch Project

This Node.js project serves as a simple API server for interacting with Elasticsearch. It provides functionality for
managing indices and blog posts using the Elasticsearch database.

This project was developed in order to increase the level of familiarity and personal skill of its developer while
passing the **node.js** programming course under the supervision of [Erfan Yousefi](https://github.com/erfanyousefi/).

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Elasticsearch Installation](#elasticsearch-installation)
- [Installation](#installation)
- [Configuration](#configuration)
- [Starting the Server](#starting-the-server)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributors](#contributors)

## Project Structure

The project follows a standard Node.js project structure. Key directories and files include:

- **controllers:** Contains controller functions for handling business logic.
- **config:** Contains configuration files, such as Elasticsearch configuration.
- **router:** Defines routers for different API endpoints.
- **resource:** Contains views and layouts for the EJS templating engine.
- **app.js:** Main entry point for the application.
- **.env:** Configuration file for environment variables.
- **package.json:** Describes project metadata and dependencies.
- **README.md:** Documentation file.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (latest version)
- [Elasticsearch](https://www.elastic.co/) (latest version)
- [Docker](https://www.docker.com/) (latest version)
- [Visual Studio Code](https://code.visualstudio.com/) (or any code editor of your choice)

## Elasticsearch Installation

To run the project, you need to set up Elasticsearch using Docker. Follow these steps:

1. Pull the Elasticsearch and Kibana Docker images:

   ```shell
   docker pull docker.elastic.co/kibana/kibana:8.11.1
   docker pull docker.elastic.co/elasticsearch/elasticsearch:8.11.1
   ```

2. Increase the system `vm.max_map_count` (required for Elasticsearch in linux and mac):

   ```shell
   sudo sysctl -w vm.max_map_count=262144
   ```

3. Create a Docker network named `elastic`:

   ```shell
   docker network create elastic
   ```

4. Run the Elasticsearch container:

   ```shell
   docker run --name es01 --net elastic -p 9200:9200 -it -m 1GB docker.elastic.co/elasticsearch/elasticsearch:8.11.1
   ```

   This command creates a container named `es01` connected to the `elastic` network, maps port 9200 on the host to port
   9200 in the container, and limits memory usage to 1GB.

5. Run the Kibana container:

   ```shell
   docker run --name kib01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.11.1
   ```

   This command creates a Kibana container named `kib01` connected to the `elastic` network and maps port 5601 on the
   host to port 5601 in the container.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/saeedNW/node.js-elasticsearch.git
   ```

2. Navigate to the project directory:

   ```bash
   cd node.js-elasticsearch
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

Configure the Elasticsearch connection and other settings in the `.env` file. Update the following variables:

- `PORT`: The port on which the server will run.
- `ELASTIC_USERNAME` and `ELASTIC_PASSWORD`: Elasticsearch credentials.
- `ELASTIC_HOST`: Elasticsearch host URL.

## Starting the Server

Run the following command to start the server:

```bash
npm run dev
```

The server will be accessible at `http://localhost:3000` or the specified port.

## API Endpoints

- **GET /:** Landing page.
- **POST /indices/new:** Create a new Elasticsearch index.
- **GET /indices/list:** Get a list of all created indexes.
- **DELETE /indices/remove/:indexName:** Remove a specified Elasticsearch index.
- **POST /blogs/new:** Create a new blog post.
- **GET /blogs/list/:value?:** Retrieve all blog posts or search for posts based on a value.
- **DELETE /blogs/remove/:id:** Remove a specified blog post.
- **PUT /blogs/update/:id:** Update a blog post using the index method.
- **PATCH /blogs/update/:id:** Update a blog post using the update method.
- **GET /blogs/findByTitle:** Find a blog post by title.
- **GET /blogs/multi-fields:** Find blog posts by multiple fields.
- **GET /blogs/regexp-search:** Find blog posts using a regular expression.
- **GET /blogs/findBlogByMultiField:** Find blog posts by multiple fields and a regular expression.

## Error Handling

The project includes error handling for both 404 Not Found and general server errors. Custom error messages are returned
in JSON format.

## Contributors

We would like to thank the following individuals who have contributed to the development of this application:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎
‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)

[**Erfan Yousefi - Supervisor and instructor of the node.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)

Feel free to contribute by opening issues or submitting pull requests.