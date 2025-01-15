package keeper

import (
	"context"
	"strings"

	"blockchain/x/blockchain/types"

	"cosmossdk.io/store/prefix"
	"github.com/cosmos/cosmos-sdk/runtime"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) FilterResources(goCtx context.Context, req *types.QueryFilterResourcesRequest) (*types.QueryFilterResourcesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	storeAdapter := runtime.KVStoreAdapter(k.storeService.OpenKVStore(goCtx))
	store := prefix.NewStore(storeAdapter, types.KeyPrefix(types.ResourceKey))

	var filteredResources []types.Resource
	pageRes, err := query.FilteredPaginate(store, req.Pagination, func(key []byte, value []byte, accumulate bool) (bool, error) {
		var resource types.Resource
		if err := k.cdc.Unmarshal(value, &resource); err != nil {
			return false, err
		}

		// handle filtering
		if req.NameFilter != "" && !strings.Contains(resource.Name, req.NameFilter) {
			return false, nil
		}

		if req.DescriptionFilter != "" && !strings.Contains(resource.Description, req.DescriptionFilter) {
			return false, nil
		}

		if req.CreatorFilter != "" && !strings.EqualFold(resource.Creator, req.CreatorFilter) {
			return false, nil
		}

		if req.OwnerFilter != "" && !strings.EqualFold(resource.Owner, req.OwnerFilter) {
			return false, nil
		}
		
		// adding filtered resource to resources
		if accumulate {
            filteredResources = append(filteredResources, resource)
        }
		
		return true, nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryFilterResourcesResponse{Resource: filteredResources, Pagination: pageRes}, nil
}
