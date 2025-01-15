package keeper

import (
	"context"
	"fmt"

	"blockchain/x/blockchain/types"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) UpdateResource(goCtx context.Context, msg *types.MsgUpdateResource) (*types.MsgUpdateResourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	val, found := k.GetResource(ctx, msg.Id)
	if !found {
		return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}
	if msg.Creator != val.Creator {
		return nil, errorsmod.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var updatedName = msg.Name
	if updatedName == "" {
		updatedName = val.Name
	}

	var updatedDescription = msg.Description
	if msg.Description == "" {
		updatedDescription = val.Description
	}

	var updatedCreator = msg.Creator
	if msg.Creator == "" {
		updatedCreator = val.Creator
	}

	var resource = types.Resource{
		Name:        updatedName, // name is an optional field
		Creator:     updatedCreator,
		Owner:       val.Owner,
		Description: updatedDescription, // description is an optional field
		Id:          msg.Id,
	}

	k.SetResource(ctx, resource)

	return &types.MsgUpdateResourceResponse{}, nil
}
