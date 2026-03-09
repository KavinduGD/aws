# EBS (Elastic Block Store)

- designed for use with Amazon EC2 instances
- network attached storage
- can detach and attach to another ec2
- Unlike the temporary "Instance Store" that comes with some EC2 instances, EBS volumes are persistent.

## EBS types

### EBS should be located in the same AZ as the ec2 instance

- EBS volumes are AZ specific
- To move to different AZ must create a snapshot

### Attach a new EBS

- **create a new EBS and attach**
- **partition the EBS**
- **format the EBS to a filesystem**
- **mount the EBS to a directory**
- temporary mount : use mount
- permanent mount : add to /etc/fstab

🛑 Multi-Attach - Some SSD-based volumes (specifically io1 and io2) allow you to attach a single volume to multiple EC2 instances simultaneously within the same AZ. This is useful for clustered applications that need shared storage.

## AMI

- An AMI (Amazon Machine Image) is a template used to create a virtual server in AWS.
- AMI = Snapshot + Metadata + Launch configuration

## Snapshot

- A snapshot is a backup of an EBS volume.
