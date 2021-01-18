class ApiResponse {
    status
    message
    result
    currentPage
    pages
    totalElements

    constructor({ status, message, result, currentPage, pages, totalElements }) {
        Object.assign(this, {
            status,
            message,
            result,
            currentPage,
            pages,
            totalElements
        })
    }
}

module.exports = ApiResponse