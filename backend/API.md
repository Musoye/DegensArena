## API Documentation

This document describes how to test the API endpoints for tokens, battles, and summaries.

Base URL: `http://127.0.0.1:3000`

### Token

NB: creator_id is the contract address of the creator token
contender_id is the contract address of the contender token

#### Get All Tokens

GET /tokens
Response:

```
{
    "data": [
        {
            "address": "So11111111111111111111111111111111111111112",
            "decimals": 9,
            "lastTradeUnixTime": 1720096149,
            "liquidity": 7442561751.347015,
            "logoURI": "https://img.fotofolio.xyz/?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png",
            "mc": 78478132226.35109,
            "name": "Wrapped SOL",
            "symbol": "SOL",
            "v24hChangePercent": 14.87271571062149,
            "v24hUSD": 1745618633.2126365
        },
        {
            "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "decimals": 6,
            "lastTradeUnixTime": 1720096149,
            "liquidity": 261313441.68454826,
            "logoURI": "https://img.fotofolio.xyz/?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png",
            "mc": 2378685621.9580646,
            "name": "USD Coin",
            "symbol": "USDC",
            "v24hChangePercent": 18.73150502926327,
            "v24hUSD": 947436815.6605616
        },
        ]
}
```

#### Get a particular token with a particular contract address

GET /tokens/:contract_address
GET /tokens/So11111111111111111111111111111111111111112
Response:

```
{
    "address": "So11111111111111111111111111111111111111112",
    "decimals": 9,
    "lastTradeUnixTime": 1720098348,
    "liquidity": 7443265650.613442,
    "logoURI": "https://img.fotofolio.xyz/?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png",
    "mc": 77598405926.88298,
    "name": "Wrapped SOL",
    "symbol": "SOL",
    "v24hChangePercent": 12.81682380379055,
    "v24hUSD": 1735120464.0781221
}
```

### BATTLE

#### Create a BATTLE

POST /battles
Request body(json):
{
'creator_id': creator_id,
'creator_name': creator_name,
'contender_name': contender_name,
'creator_img': creator_img,
'contender_img': contender_img,
'contender_id': contender_id,
'time': datetime.now().isoformat()
}
Response -> will return the created information

#### Get All Battles

GET /battles
Response -> All battles will be returned

#### Get Battles by status

GET /battles/live returns live battles
GET /battles/future returns future battles
GET /battles/past returns past battles

#### Get a Battle by status

GET /battles?query=x where x can be status
status value can either be future, past, live
Response -> All token that satisfy this condition will be returned

#### Get a Particular Battle

GET /battles/:id where id will be id of the battle
Response -> The battle will be retuned if exist

#### Update a Particular Battle

PUT /battles/:id where id will be id of the battle
contender_id, creator_img, contender_img, contender_name and time can be changed
Request body(json):
{
'contender_id': contender_id,
'time': datetime.now().isoformat()
}
Response -> will return the updated information

### Summaries

NB: value of winner can either be creator or contender

#### Create a Summary

POST /summaries
Request body(json):
{
'battle_id': battle_id,
'winner': 'contender'
}
Response -> will return the created information

#### Get All Summaries

GET /summaries
Response -> All summaries will be returned

#### Get a summary by winner

GET /tokens?query=x where x can only be winner
winner can only be contender or creator
Response -> All summaries that satisfy this condition will be returned

#### Get a Particular Summary

GET /summaries/:id where id will be id of the summary
Response -> The summary will be retuned if exist

#### Get a Summary using a battle_id

NB: This will return value if winner has been declare between two battle
GET /summaries/:id/battles where id is battle_id
Response -> The summary will be retuned if exist

#### Update a Particular Token

PUT /summaries/:id where id will be id of the summary
winner can only be changed and its value can only be creator or contender
Request body(json):
{
'winner': 'contender'
}
Response -> will return the updated information

### Transactions

NB: transcation created for  token bought

#### Create a Transaction

POST /transaction
Request body(json):
{
    'token': token,
    'amonut': 'amount',
    'user-id': user_id,
    'contender_id': 'contender_id'
}
Response -> will return the created information

#### Get all transactions or by a particular token

GET /transactions?token=x where x can be the token name

Response -> Either all transactions or transactions  of a particular token

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

This document provides a comprehensive guide for testing the API endpoints using Python's requests module. Each section covers a different aspect of the API, including tokens, battles, and summaries, with examples for creating, retrieving, and updating records.
