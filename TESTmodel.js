
"OPERATION TEMPLATE"
transactiontitle = ""
emissiontimestamp = ""
targetaccount = ""
type = "card or prelevement or newmove"
// we can actually separate em and use a little more coomplex card with ng if
cardnumber
prelevref
newmovenote = "cardnumber or prelevref or newmovenote"
amount = "+ or -"
amountnegative = "true or false"
transactionstatus = "pending or incoming or history or rejected" //luluhistory = validated

"PENDING"
leikodevalidationstatus = "pending refused confirmed"; //action de l'utilisateur
bankvalidationstatus = "true or false" //nous on check le montant

"REJECTED"
rejectionmotif = "leikoderefused bankrefused" //ce qu'on affiche danse

"INCOMING" //seulement prelevref et newmoveid
estimateddate = "date"

"HISTORY"
category = "none",
    subcategory = "none,"
// C'est bon on a tout frate


historytransactions = [
    {
        transactiontitle: "Amazon Payements Europe S",
        emissiontimestamp: "1656594361",
        sumbissiontimestamp: "1656594381",
        targetaccount: "AD1200012030200359100100",
        type: "card",
        cardnumberorprelevrefornewmovenote: "379108098493384",
        amount: "-12.99",
        amountnegative: "true",
        transactionstatus: "history",
        leikodevalidationstatus: "confirmed",
        bankvalidationstatus: "valid",
        category: "none",
        subcategory: "none"
    },
]
