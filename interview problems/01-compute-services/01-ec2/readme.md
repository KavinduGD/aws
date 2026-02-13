# EC2 interview Questions

## ec2 stand for?

- Elastic Compute Cloud

## What is aws EC2?

- provide virtual servers in the cloud
- instead of buying and maintaining physical servers, you can use aws ec2 to run your applications
- customize resources as per your needs

## What is EBS?

- EBS is the Elastic Block Store
- it is a network-attached storage
- like a virtual hard drive
- if instance stops, EBS volume is not lost

## EBS vs instance store

- EBS
    - persistent storage
    - data stays even if instance is stopped
    - network attached storage

- Instance Store
    - ephemeral storage (temporary storage)
    - data is lost if instance is stopped
    - physically attached to the instance
    - not every instance type has instance store

## What is EFS?

- EFS is the Elastic File System
- EFS is a scalable file storage service that can be shared between multiple EC2 instances.
- if instance stops, EFS volume is not lost
- EFS is a network-attached storage

## What is Security Group?

- Security group is a virtual firewall
- It defines the rules for inbound and outbound traffic

## What is a key pair?

- Key pair is a pair of public and private keys
- It is used to authenticate the user

## How to connect to an EC2 instance?

- Connect to an EC2 instance using SSH
- Connect to an EC2 instance using RDP
- ssh -i <key-pair-file> <user>@<public-dns-name>

## What is Elastic IP?

- Elastic IP is a static IP address
- can attach/detach to an instance
- use when public ip is needed

## Diffrence between stop and terminate an instance?

- stop instance
  - Instancee shutdown
  - can be started again
  - EBS volumes are preserved

- terminate instance
  - Instance is deleted
  - cannot be started again
  - EBS volumes are deleted 

## What is auto scaling group?

- Auto scaling group is a group of EC2 instances
- It automatically adjusts the number of instances based on the demand
- It helps to maintain the desired number of instances
- adjust based on cpu usage, memory usage, network in/out and custom metrics


## What is EC2 instance lifecycle?

1. Pending
2. Running
3. Stopping
4. Stopped
5. Terminating
6. Terminated

## What is EC2 instance pricing models?

- On-Demand
- Reserved Instances - reserve specific instance type for 1 or 3 years
- Spot Instances
- Savings Plans - You commit to spend a fixed amount per hour for 1 or 3 years

## Gow to monitor EC2 instances?

- CloudWatch
  - cpu usage
  - memory usage
  - network in/out
  - disk in/out
  - custom metrics

## Hoe to secure EC2 instances?
  
  - Use security groups properly
  - Use network ACLs
  - Patch OS regularly
  - Use private subnet and add a jump host , for deployment server also add a loadbalncer in front of it
  - Use IAM roles - If application inside the ec2 need to access other aws services
  - Disable root login (diabled by default in aws)

## What is user data?

- User data is a script that is run when the instance is launched
- It is used to install software, configure the instance, etc.
- Run only once when the instance is launched