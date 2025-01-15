package main

import (
	"fmt"
	"os/exec"
	"strconv"
)

type TxResponse struct {
    TxHash string `json:"txhash"`
    Height string `json:"height"`
}

func create_resource(name string, description string, from_user string) {
	cmd := exec.Command(
		"blockchaind", "tx", "blockchain", "create-resource", name, description, 
		"--from", from_user, "--chain-id", "blockchain", "--yes",
	)

	output, err := cmd.CombinedOutput()

	if err != nil {
        fmt.Printf("Error: %v\n", err)
        fmt.Printf("Output: %s\n", string(output))
        return
    }

	fmt.Printf("Output: \n\n %s\n", string(output))
}

// to find resource that contain nameFilter and descriptionFilter, and have an exact match in creator and owner fields 
// use "" for fields that has no filter criteria
func list_filtered_resources(nameFilter string, descriptionFilter string, creatorMatch string, ownerMatch string, from_user string) {
	cmd := exec.Command(
		"blockchaind", "query", "blockchain", "filter-resources", nameFilter, descriptionFilter, ownerMatch, creatorMatch,
	)

	output, err := cmd.CombinedOutput()

	if err != nil {
        fmt.Printf("Error: %v\n", err)
        fmt.Printf("Output: %s\n", string(output))
        return
    }

	fmt.Printf("Output: %s\n", string(output))
}

func get_resource(id uint) {
	cmd := exec.Command(
		"blockchaind", "q", "blockchain", "show-resource", strconv.Itoa(int(id)),
	)

	output, err := cmd.CombinedOutput()

	if err != nil {
        fmt.Printf("Error: %v\n", err)
        fmt.Printf("Output: %s\n", string(output))
        return
    }

	fmt.Printf("Output: \n\n %s\n", string(output))
}

// empty "" if you don't want to update that field
func update_resource(id uint, name string, description string, from_user string) {
	cmd := exec.Command(
		"blockchaind", "tx", "blockchain", "update-resource", name, description, strconv.Itoa(int(id)),
		"--from", from_user, "--chain-id", "blockchain", "--yes",
	)

	output, err := cmd.CombinedOutput()

	if err != nil {
        fmt.Printf("Error: %v\n", err)
        fmt.Printf("Output: %s\n", string(output))
        return
    }

	fmt.Printf("Output: %s\n", string(output))
}

func delete_resource(id uint, from_user string) {
	cmd := exec.Command(
		"blockchaind", "tx", "blockchain", "delete-resource", strconv.Itoa(int(id)), "--from", from_user, "--chain-id", "blockchain", "--yes",
	)

	output, err := cmd.CombinedOutput()

	if err != nil {
        fmt.Printf("Error: %v\n", err)
        fmt.Printf("Output: %s\n", string(output))
        return
    }

	fmt.Printf("Output: %s\n", string(output))
}

func main() {
	// create_resource("client resource", "resource for client", "bob")
	// delete_resource(2, "bob")
	// list_filtered_resources("", "first", "", "", "bob")
}