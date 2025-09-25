# Route tables

## Main route table

- **Each VPC has a main route table that is automatically created when the VPC is created.**
- **If subnets have no explicit route table associated with them, they use the main route table.**
- **Main route table enable traffic between subnets within the VPC by default.**
- **Main route table also enables traffic to and from the internet if the VPC has an internet gateway attached and a route to the internet gateway is present in the main route table.**

| Destination | Target | Description                                                                                                 |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| 10.0.0.0/16 | local  | 😀 If the traffic send to a address in the VPC sent them to local router (This enable inter subnet traffic) |
| 0.0.0.0/0   | igw    | 😀 If the traffic is destined for an address outside the VPC, it is sent to the internet gateway            |

<img src="./images/main_route.png" width="900"/>

## Custom route table

- **You can create custom route tables to control the routing for specific subnets within your VPC.**
- **Custom route tables can be associated with one or more subnets, allowing you to define**
- **Custom route table is overrides the main route table for the associated subnets.**
- **But still if a subnet is not explicitly associated with a custom route table, it will use the main route table.**

<img src="./images/main_route_table_inharit.png" width="900"/>

<br/>
<br/>

<img src="./images/cusom_public_private_subnet.png" width="900"/>
