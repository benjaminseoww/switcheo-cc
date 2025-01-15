## Explain what does it mean by breaking consensus.
This is when the consensus mechanism of the blockchain could not agree on the state of the digital ledger after proposed changes or transactions. This means that records of the same blockchain become inconsistent across different nodes, leading it to be invalid

## My Change 
in config.yml:
changed:
- name: bob
  coins:
  - 10000token
  - 100000000stake

to:
- name: bob
  coins:
  - 50000token
  - 500000000stake

## Explain why your change would break the consensus.
As I have build the original chain in the main branch, by changing the balances of bob in the config file and starting this edited version of the blockchain, the original and edited version do not agree on the initial balances in bob's account. Hence the records are not unified and hence break the consensus