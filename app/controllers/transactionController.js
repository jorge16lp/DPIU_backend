const transactionService = require('../services/transactionService')

transactionController = {
    getTransactionsPublic: async (req, res) => {
        try {
            let sellerId = req.query.sellerId
            let buyerId = req.query.buyerId
            console.log("seller", sellerId, "buyer", buyerId)
            let transactions = await transactionService.getTransactionsPublic(sellerId, buyerId)
            return res.json(transactions)
        }
        catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }

    },
    getTransactions: async (req, res) => {
        try {
            let userId = req.infoInApiKey.id
            let productId = req.params.productId
            let transactions = await transactionService.getTransactions(userId, productId)
            return res.json(transactions)
        }
        catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }

    },
    postTransaction: async (req, res) => {
        try {
            let userId = req.infoInApiKey.id
            let { productId, buyerPaymentId, startDate, endDate } = req.body
            const insertInfo = await transactionService.postTransaction( userId, productId, buyerPaymentId, startDate, endDate )
            return res.json(insertInfo)
        }catch (errors) {
            console.log(errors)
            return res.status(errors[0].code).json({ errors: errors} )
        }

    },
}
module.exports = transactionController