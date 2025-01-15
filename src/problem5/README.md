# Problem 5
This repository contains two main components: <br>
1. Blockchain: The blockchain created using Ignite CLI. <br>
2. CRUD Interface: The solution CRUD interface for interacting with the blockchain. <br>

## Building the blockchain 

###Navigate to Blockchain Directory
```
cd blockchain
```

###Run the blockchain
```
ignite chain serve
```

## Using the CRUD Interface


###Navigate to CRUD Interface Directory
```
cd resourceclient
```

###all the CRUD functions in main.go main()
- `create_resource(name string, description string, from_user string)`:  Create a resource.
    - `name`: name of resource 
    - `description`: description of resource 
    - `from_user`: accounts name according to `config.yml` in `/blockchain`
- `list_filtered_resources(nameFilter string, descriptionFilter string, creatorMatch string, ownerMatch string, from_user string)`: List resources with basic filters.
    - `nameFilter`: the string to find resources whose name contains it (i.e. "a" to get resources whose name that has a "a")
    - `descriptionFilter`: the string to find resources whose description contains it
    - `ownerMatch`: find resources whose owner is exactly this
    - `creatorMatch`: find resources whose creator is exactly this
    - `from_user`: accounts name according to `config.yml` in `/blockchain`
    - enter `""` to parameters you have no filter criteria for
- `get_resource(id uint)`: Get details of a resource.
    - `id`: id of resource
- `update_resource(id uint, name string, description string, from_user string)`: Update resource details.
    - `id`: id of resource
    - `name`: name of resource 
    - `description`: description of resource 
    - `from_user`: accounts name according to `config.yml` in `/blockchain`
- `delete_resource(id uint, from_user string)`: Delete a resource.
    - `id`: id of resource
    - `from_user`: accounts name according to `config.yml` in `/blockchain`

### Call the funcitions
```
go run problem4.go
```