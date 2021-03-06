# Part 1
**This is the part for who want to know some details, if you just want to setup Mock API go to [Part 2](#part-2)**

# Guide

https://docs.aws.amazon.com/lambda/latest/dg/sam-cli-requirements.html

# Steps

## 1, Install Docker

https://docs.docker.com/install/

Some helpful commands:

list all docker images
```
docker image ls
```
pull a image from Docker Hub
```
docker pull lambci/lambda
```
run a docker image "lambci/lambda:java8", set handler to 'org.lambci.lambda.ExampleHandler', set event to a json '{"some": "event"}'
```
docker run --rm -v "%cd%/build/docker":/var/task lambci/lambda:java8 org.lambci.lambda.ExampleHandler '{"some": "event"}'
```
## 2, Install AWS sam local

https://github.com/awslabs/aws-sam-local

install aws sam local, npm needed
```
npm install -g aws-sam-local
```
check sam version
```
sam --version
```
## 3, Setup template.yaml and event json

Sam will look for template.yaml and event json

A sample template.yaml

```
AWSTemplateFormatVersion : '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: My first serverless application.

Resources:
  ExampleJavaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: org.lambci.lambda.ExampleHandler
      CodeUri: ./target/example-handler-1.0.0.jar
      Runtime: java8
      Timeout: 20
  CreateThumbnailJavaFcuntion:
    Type: AWS::Serverless::Function
    Properties:
      Handler: example.S3EventProcessorCreateThumbnail
      CodeUri: ./target/lambda-java-example-1.0-SNAPSHOT-shaded.jar
      Runtime: java8
      Timeout: 20
  CreateThumbnailJavaFcuntionUnzip:
    Type: AWS::Serverless::Function
    Properties:
      Handler: example.S3EventProcessorCreateThumbnail
      CodeUri: ./target/lambda-java-example
      Runtime: java8
      Timeout: 20
  Products:
    Type: AWS::Serverless::Function
    Properties:
      Handler: products.handler
      Runtime: nodejs6.10
      Events:
        ListProducts:
          Type: Api
          Properties:
            Path: /products
            Method: get
        CreateProduct:
          Type: Api
          Properties:
            Path: /products
            Method: post
        Product:
          Type: Api
          Properties:
            Path: /products/{product}
            Method: any
```

Sample event json
```
{
  "Records": [
    {
      "eventVersion": "2.0",
      "eventTime": "1970-01-01T00:00:00.000Z",
      "requestParameters": {
        "sourceIPAddress": "127.0.0.1"
      },
      "s3": {
        "configurationId": "testConfigRule",
        "object": {
          "eTag": "61b37716c0b3323e2785e259efc1205f",
          "key": "Lei Li.jpg",
          "size": 1126753
        },
        "bucket": {
          "arn": "arn:aws:s3:::leiliciscotest",
          "name": "leiliciscotest",
          "ownerIdentity": {
            "principalId": "EXAMPLE"
          }
        },
        "s3SchemaVersion": "1.0"
      },
      "responseElements": {
        "x-amz-id-2": "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH",
        "x-amz-request-id": "EXAMPLE123456789"
      },
      "awsRegion": "us-east-2",
      "eventName": "ObjectCreated:Put",
      "userIdentity": {
        "principalId": "EXAMPLE"
      },
      "eventSource": "aws:s3"
    }
  ]
}
```

## 4, Call sam to invoke lambda function, using docker image lambci/lambda
a sample call of sam local, write reuslt into a file 'output.log'
```
sam local invoke CreateThumbnailJavaFcuntion -e .\\event\\create_thumbnail.json --log-file ./output.log
```
## 5, start aws sam

start sam
```
sam local start-api
```
start sam on a specific port
```
sam local start-api -p 5858
```
or start sam on a specific port with local logging
```
sam local start-api --log-file ./output.log -p 5858
```
### small note

You don't need to restart to make changes in your handlers work

# Part 2
**This is the part for who don't want or need to know the detail, just setup mock API**

# Steps

## 1, Install Docker
Follow instructions here: https://docs.docker.com/install/

Community edition is good enough for testing, an installation option example: Community edition, Windows desktop, Stable version

After docker is installed, start it, and do:
```
docker pull lambci/lambda
docker image ls
```
Those commands pull the image from docker hub and list images you have
### small note
The image you'll use is linux based, so if you have error: "image operating system 'linux' cannot be used on this platform", switch docker to Linux Container in docker settings
## 2, Install npm
Follow instructions here: https://www.npmjs.com/get-npm

npm comes together with Node, so normally you only need to install Node, here is the way: https://nodejs.org/en/download/

```
Node -v
```
This command verifies the installation. You may need to close and reopen cmd window.
## 3, Install AWS sam local
Follow instructions here: https://github.com/awslabs/aws-sam-local
```
sam --version
```
This command shows sam version to verify it is installed successfully.
## 4, Clone Mock API repo from git
Clone from this repo: https://github.com/Emiyashirou/sysco_mock_api
## 5, Start AWS sam
From the cmd, navigate to the directory you just cloned, to make sure you are in the correct folder, use command "dir" in windows or "ls" in linux to list the files, make sure there is a template.yaml in current folder

Then start sam
```
sam local start-api
```
start sam on a specific port
```
sam local start-api -p 5858
```
or start sam on a specific port with local logging
```
sam local start-api --log-file ./output.log -p 5858
```
## 6, Possible Errors or Warnings
If you get an error as below:
```
unable to use container host config override file from '$HOME/.config/aws-sam-local/container-config.json': HOME env variable is not set
```
The reason is HOME is not set in system variables, if you are using a windows system, it can be done by “control panel” - “edit the system environment variables” - tab “advanced” – “environment variables” and then add HOME into system variables. It can be the user folder, e.g.: "C:\Users\Your.Name".

If you get an warning as below:
```
WARNING: No AWS credentials found. Missing credentials may lead to slow startup times as detailed in https://github.com/awslabs/aws-sam-local/issues/134
```
For this warning, it’s because sam local is using AWS CLI and AWS CLI can set AWS account information, but it’s not required, you can ignore it for now.
# Appendix: APIs available

## http://127.0.0.1:5858/groups [GET]

Get groups list.

## http://127.0.0.1:5858/groups/{id} [GET]

Get one group by id. E.g.: GET - http://127.0.0.1:5858/groups/01

## http://127.0.0.1:5858/groups [POST]

Add new group, handler will return same body back.

## http://127.0.0.1:5858/groups/{id} [PUT]

Update group by id, handler will return same body back. E.g.: PUT - http://127.0.0.1:5858/groups/01

## http://127.0.0.1:5858/groups [OPTIONS]

Get options, handler will return same body back.

## http://127.0.0.1:5858/locations [GET]

Get locations list.

## http://127.0.0.1:5858/locations/{id} [GET]

Get one location by id. E.g.: GET - http://127.0.0.1:5858/locations/01-000001

## http://127.0.0.1:5858/locations [OPTIONS]

Get options, handler will return same body back.

## http://127.0.0.1:5858/locations [POST]

Add new location, handler will return same body back.

## http://127.0.0.1:5858/locations/{id} [PUT]

Update location by id, handler will return same body back. E.g.: PUT - http://127.0.0.1:5858/locations/01-000001

## http://127.0.0.1:5858/looksup [GET]

This API is empty for now.

## http://127.0.0.1:5858/looksup/{category} [GET]

Look up all roles. E.g.: GET - http://127.0.0.1:5858/looksup/Roles

## http://127.0.0.1:5858/looksup [OPTIONS]

Get options, handler will return same body back.

## http://127.0.0.1:5858/opcos [GET]

Get OpCos list.

## http://127.0.0.1:5858/opcos/{id} [GET]

Get one OpCo by id. E.g.: GET - http://127.0.0.1:5858/opcos/001

## http://127.0.0.1:5858/opcos [OPTIONS]

Get options, handler will return same body back.

## http://127.0.0.1:5858/markets [GET]

Get Markets list.

## http://127.0.0.1:5858/markets/{id} [GET]

Get one market by id. E.g.: GET - http://127.0.0.1:5858/markets/001

## http://127.0.0.1:5858/markets [OPTIONS]

Get options, handler will return same body back.

## http://127.0.0.1:5858/global-settings [GET]

Get global settings.

## http://127.0.0.1:5858/global-settings [POST]

Post global settings, handler will return same body back.

## http://127.0.0.1:5858/global-settings [PUT]

Put global settings, handler will return same body back.

## http://127.0.0.1:5858/global-settings [OPTIONS]

Get options, handler will return same body back.

## http://127.0.0.1:5858/users/{id} [PUT]

Update user by id, handler will return same body back. E.g.: PUT - http://127.0.0.1:5858/users/001

## http://127.0.0.1:5858/users [GET]

Get user list.

## http://127.0.0.1:5858/users/{id} [GET]

Get one user by id. E.g.: GET - http://127.0.0.1:5858/users/001

## http://127.0.0.1:5858/users [POST]

Add new user, handler will return same body back.

## http://127.0.0.1:5858/users [OPTIONS]

Get options, handler will return same body back.
