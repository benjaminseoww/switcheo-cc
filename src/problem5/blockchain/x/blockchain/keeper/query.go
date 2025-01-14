package keeper

import (
	"blockchain/x/blockchain/types"
)

var _ types.QueryServer = Keeper{}
