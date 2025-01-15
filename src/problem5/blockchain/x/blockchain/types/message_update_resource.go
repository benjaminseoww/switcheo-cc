package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgUpdateResource{}

// TODO: need to check if this doesnt work, does owner need to be here despite not being specified in scaffold command?
func NewMsgUpdateResource(creator string, name string, description string, id uint64) *MsgUpdateResource {
	return &MsgUpdateResource{
		Creator:     creator,
		Name:        name,
		Description: description,
		Id:          id,
	}
}

func (msg *MsgUpdateResource) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
