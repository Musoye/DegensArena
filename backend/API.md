## API Documentation

This document describes how to test the API endpoints for tokens, battles, transactions, and summaries.

Base URL: `http://127.0.0.1:3000`

NB: where creator_id or contender_id is mentioned it is referring to their contract_address

### Token

NB: creator_id is the contract address of the creator token
contender_id is the contract address of the contender token

#### Get All Tokens

GET /tokens
Response:

```
[
    {
        "id":"6731e3079889ea941b191931","name":"Stacks","price":2.0488316315618937,"contract_address":"SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.wstx","symbol":"STX"
        "image_url":"https://raw.githubusercontent.com/VelarBTC/token-images/main/stx.jpg","point":0,"createdAt":"2024-11-11T10:57:11.901Z","updatedAt":"2024-11-11T10:57:11.901Z"},
    {
        "id":"6731e3089889ea941b191934","name":"Velar","price":0.06888418867876292,"contract_address":"SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.velar-token","symbol":"VELAR",
        "image_url":"https://raw.githubusercontent.com/velar-be/asset-hosting/main/velar.jpg","point":0,"createdAt":"2024-11-11T10:57:12.361Z","updatedAt":"2024-11-11T10:57:12.361Z
    }
]
```

#### Get a particular token with a particular contract address

GET /tokens?contract_address={contract_address}
Response:
```
[
    {
        "id":"6731e3089889ea941b191934","name":"Velar","price":0.06888418867876292,"contract_address":"SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.velar-token","symbol":"VELAR",
        "image_url":"https://raw.githubusercontent.com/velar-be/asset-hosting/main/velar.jpg","point":0,"createdAt":"2024-11-11T10:57:12.361Z","updatedAt":"2024-11-11T10:57:12.361Z
    }
]
```

#### Get a particular token with an id

GET /tokens/:id
Response:
```
{
        "id":"6731e3089889ea941b191934","name":"Velar","price":0.06888418867876292,"contract_address":"SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.velar-token","symbol":"VELAR",
        "image_url":"https://raw.githubusercontent.com/velar-be/asset-hosting/main/velar.jpg","point":0,"createdAt":"2024-11-11T10:57:12.361Z","updatedAt":"2024-11-11T10:57:12.361Z
}
```

### BATTLE

#### Create a BATTLE

POST /battles
Request body(json):
{
'creator_id': creator_id,
'contender_id': contender_id,
}
Response -> will return the created information(note the image_url and name of both the contender and creator will be added on the response object)

#### Get All Battles

GET /battles
Response -> All battles will be returned

#### Get Battles by status

GET /battles/live returns live battles
GET /battles/past returns past battles

#### Get a Battle by status

GET /battles?query=x where x can be status
status value can either be past, live
Response -> All token that satisfy this condition will be returned

#### Get a Particular Battle

GET /battles/:id where id will be id of the battle
Response -> The battle will be retuned if exist

#### Update a Particular Battle

PUT /battles/:id where id will be id of the battle
contender_id, creator_img, contender_img, contender_name and status can be changed
Request body(json):
{
'contender_id': contender_id,
'status': 'past'
}
Response -> will return the updated information

### Summaries

NB: value of winner can either be creator_id or contender_id

#### Create a Summary

POST /summaries
Request body(json):
{
'battle_id': battle_id,
'winner': 'contender_id'
}
Response -> will return the created information(the status of the battle will be change to past)

#### Get All Summaries

GET /summaries
Response -> All summaries will be returned

#### Get a summary by winner

GET /tokens?query=x where x can only be of  value contender or creator
Response -> All summaries that satisfy this condition will be returned

#### Get a Particular Summary

GET /summaries/:id where id will be id of that particular summary
Response -> The summary will be retuned if exist

#### Get a Summary using a battle_id

NB: This will return value if winner has been declare between two battle
GET /summaries/:id/battles where id is battle_id
Response -> The summary will be retuned if it exists

#### Update a Particular Summary

PUT /summaries/:id where id will be id of the summary
new winner are specified using the id of either the creator or the contender(creator_id or contender_id)
Request body(json):
{
'winner': contender_id
}
Response -> will return the updated information

### Transactions

NB: transcation created for purchase of token

#### Create a Transaction

POST /transactions
Request body(json):
{
    'token': <contract_address_of_the_token>,
    'amonut': 'amount',
    'user_id': <wallet_address>
}
Response -> will return the created information

#### Get all transactions 

GET /transactions

Response -> all transactions

#### Get all transactions  by a particular token

GET /transactions?token=x where x can be the contract_address of the token

Response -> all transactions  of a particular token

#### Get a Particular transaction

GET /transactions/:id where id will be id of the transaction
Response -> The transaction will be returned if exist


#### Update a Particular Transaction

PUT /transactions/:id where id will be id of the transaction
Request body(json):
{
    amount: amount
}
Response -> will return the updated information

### Current Standings on the token position Table

GET /tokens/table -> Will return the result from the highest to lowest and it will be top 100

### Credits

NB: Data for wallet_address to credit for winnig battles

#### Get all Credits

GET /credits

Response -> all credits

#### Get all transactions by status can either be pending of paid

GET /credits?status=x where x can either be pending or paid

Response -> all credits that satisfy x

#### Get a credit by battle_id

GET /credits?battle_id=x where x is the battle id you are looking

Response -> the credits with the battle id will e returned

#### Get a credit by id

GET /creditss/:id where id will be id of the credit
Response -> The credit will be returned if exist

#### Update a credit by id

PUT /credits/:id where id will be id of the credit

it is onlt status that can be updated.
you don't need to press anyting just trigger it. the status will be updated to paid.
Response -> The credit will be updated if exist





This document provides a comprehensive guide for testing the API endpoints using Python's requests module or other such module. Each section covers a different aspect of the API, including tokens, battles, transactions and summaries, with examples for creating, retrieving, and updating records.
