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

## Instance storage

- Instance storage is temporary disk storage physically attached to the host machine running your EC2 instance.
- Think of it as local SSD inside the physical server.

Example:

```
Physical Server
├── CPU
├── RAM
└── Local SSD → Instance Storage
```

Key characteristics

| Feature     | Instance Storage                             |
| ----------- | -------------------------------------------- |
| Location    | Physically attached to host server           |
| Speed       | Very fast                                    |
| Persistence | Temporary                                    |
| Data loss   | Data is lost if instance stops or terminates |

Typical use cases

- caching
- temporary data
- buffers
- scratch processing

🛑 Only some instance types have instance storage

## 2. EBS (Elastic Block Store)

Amazon EBS is persistent network storage attached to an EC2 instance.

Think of it as a network hard drive.

Example architecture:

```text
EC2 Instance
     │
     │ network
     ↓
EBS Volume (virtual disk)
```

Key characteristics:

| Feature       | EBS                            |
| ------------- | ------------------------------ |
| Location      | Separate network storage       |
| Persistence   | Data persists after stop       |
| Detach/attach | Can attach to another instance |
| Backup        | Supports snapshots             |

---

- 🛑 We can change the instance type after launching an ec2.
- 🛑 We cannot change AMI after launching an ec2.
- 🛑 We can enable `stop protection` for an ec2. This feature prevents the instance from being stopped.
- 🛑 We can enable `termination protection` for an ec2. This feature prevents the instance from being terminated.
- We can attach multiple Network Interfaces (ENIs) to an EC2 instance for enhanced networking capabilities.
