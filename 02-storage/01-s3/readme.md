# S3 (Simple Storage Service)

### S3 service is Region specific

### S3 is a flat structure, no folders

### Total S3 bucket size is unlimited, but each object can be up to 50TB

## S3 bucket namespace

<img src="./images/ns.png" width="800" />

1. Global Namespace - The traditional model where your bucket name must be unique across all AWS accounts in the world. If another user has already claimed the name my-app-logs, you cannot use it.

2. Account-Regional Namespace - This new option allows bucket names to be unique only within your specific AWS account and region. This means you can now use simple, predictable names like logs or backups in multiple regions or accounts without competing for them globally

## S3 Security

<img src="./images/sec.png" width="800" />

### Bucket policy

<img src="./images/bucket-policy.png" width="800" />

Examples:

<img src="./images/ex1.png" width="600" />
<img src="./images/ex2.png" width="600" />
<img src="./images/ex3.png" width="600" />
<img src="./images/ex4.png" width="600" />

### To host a static website on S3

- Bucket need to public
- Objects need to be public

### S3 public access

- Uncheck Block Public Access
- This is not enough, you also need to set bucket policy or object ACL to public

## S3 Objects

- Objects are the fundamental entities stored in S3, consisting of data and metadata.
- The Anatomy of an Object
  - Key: The unique identifier for the object within a bucket. (name or path)
  - Value: The data that is stored in the object.
  - Version ID: A unique identifier for each version of an object (if versioning is enabled).
  - Tags: Key-value pairs that can be used to categorize and manage objects.
  - Metadata: Additional information about the object, such as content type, size, and custom metadata.

## S3 versioning

- S3 Versioning keeps multiple versions of the same object in a bucket, helping you recover old files if someone overwrites or deletes a file.
- Uploading a file with same name replaces the old file. With versioning s3 keep both files with different versions
- With versioning enabled, deleting a file will not remove it, instead it will add a delete marker to the object

## S3 Replication (CRR and SRR)

- Cross-Region Replication (CRR): Automatically replicates objects from a source bucket in one AWS region to a destination bucket in another AWS region. This is useful for disaster recovery, compliance, and latency reduction.
- Same-Region Replication (SRR): Automatically replicates objects from a source bucket to a destination bucket within the same AWS region. This can be used for data backup, log aggregation,or live replication between production and staging environments.
- Buckets can be in different accounts
- asynchronous process, there is a delay between source and destination buckets

## Storage Classes

<img src="./images/durability-vs-availability.png" width="800" />

<img src="./images/str-c1.png" width="1200" />

### Storage class is assigned to objects, not buckets

we can add lifecycle rules to automatically transition objects to different storage classes based on age or other criteria.

## Directory s3 Bucket with Express One Zone storage class

- Saved data in one AZ, so if that AZ goes down, data is not available until the AZ is back up
- Cheaper than standard storage class, but less available
- Suitable when compute resources and s3 storage must be in the same AZ
- low latency access to data is required
