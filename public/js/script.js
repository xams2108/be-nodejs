const quantityCards = document.querySelectorAll("[change-quantity-cart]")
if (quantityCards) {

    quantityCards.forEach(quantityCard => {
        const element = quantityCard.closest("[dataProductId]")
        const productId = element.getAttribute("dataProductId")
        console.log(productId)
        quantityCard.addEventListener("change", event => {
            if (event.target.value > 0) {
                window.location.href = `/cart/update/${productId}/${event.target.value}/`
            }

        })
    })
}