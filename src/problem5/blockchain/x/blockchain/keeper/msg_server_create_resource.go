package keeper

import (
	"context"

	"blockchain/x/blockchain/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreateResource(goCtx context.Context, msg *types.MsgCreateResource) (*types.MsgCreateResourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	var resource = types.Resource{
		Name:        msg.Name,
		Creator:     msg.Creator,
		Owner:       msg.Creator,
		Description: msg.Description,
	}
	id := k.AppendResource(
		ctx,
		resource,
	)

	return &types.MsgCreateResourceResponse{
		Id:   id,
		Name: msg.Name,
	}, nil
}
