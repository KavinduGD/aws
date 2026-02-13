# EC2 - Elastic Compute Cloud

## ec2 user data only runs one time

## EC2 security groups

- **do not update or modify existing firewall setting**
- **Act like a virtual firewall**
- **operate outside of EC2**
- **Where They Work:**
  - At the hypervisor level, on the AWS infrastructure
  - Managed and enforced by AWS, not by your operating system
- By default outbound traffic is allowed
- Inbound traffic is blocked
- **Stateful (if request allowed, response allowed automatically)**
- **allow rules only**

## Network ACLs

- Act like a firewall at the subnet level
- Operate outside of EC2
- Both inbound and outbound traffic are blocked by default
- Rules are evaluated in order from lowest to highest
- **Supports both allow and deny rules**
- **Rules are stateless (need to allow both inbound and outbound traffic)**

## AMI

- An AMI (Amazon Machine Image) is a template used to create a virtual server in AWS.

- It contains everything needed to launch an EC2 instance (a virtual machine in AWS):
  - 🧠 Operating System (like Linux or Windows)
  - 📦 Pre-installed software (like Node.js, Docker, Nginx)
  - ⚙️ Configuration settings
  - 💾 Root volume (disk snapshot) (default volume)
  - architecture (x86 or arm)

- When you launch an EC2 instance from an AMI, AWS automatically creates a root EBS volume using the AMI’s default settings.
- We can override the default settings when creating an EC2 instance from an AMI.


## Snapshots

- A snapshot is a backup of an EBS volume.
- Snapshots are stored in S3 and can be used to create new EBS volumes.
- Snapshots are encrypted by default.

## AMI vs Snapshot

- AMI
  - OS
  - Snapshot of root volume (when we create AMI, it automatically creates a snapshot of the root volume)
  - Block device mapping
  - Launch permissions
  - Architecture (x86/ARM)
- AMI = Snapshot + Metadata + Launch configuration

- Snapshot is a backup of an EBS volume.

## What is a launch template?

Launch Template (in AWS) is a configuration template used to launch EC2 instances.
  - It stores settings like:
  - AMI (machine image)
  - Instance type (like t2.micro)
  - Key pair
  - Security groups
  - Storage settings