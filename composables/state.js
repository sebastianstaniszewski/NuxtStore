export const useSearchField = () => {
    return useState('searchField', () => {
        return null
    })
}

export const useSearchResult = () => {
    return useState('searchResult', () => {
        return null
    })
}

export const useCart = () => {
    const cart = useState('cart', () => []);

    if (process.client) {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart.value = JSON.parse(storedCart);
        }
    }

    watch(cart, (newCart) => {
        if (process.client) {
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }, {deep: true});

    return cart;
}

export const useTotalCartAmount = () => {
    const totalCartAmount = useState('totalAmount', () => 0)

    if (process.client) {
        const storedAmount = localStorage.getItem('amount');
        if (storedAmount) {
            totalCartAmount.value = JSON.parse(storedAmount);
        }
    }

    watch(totalCartAmount, (newCartAmount) => {
        if (process.client) {
            localStorage.setItem('amount', JSON.stringify(newCartAmount));
        }
    }, {deep: true});

    return totalCartAmount;
};

export const useTotalPayment = () => {
    const totalPayment = useState('totalPayment', () => 0);

    if (process.client) {
        const storedPayment = localStorage.getItem('payment');
        if (storedPayment) {
            totalPayment.value = JSON.parse(storedPayment);
        }
    }

    watch(totalPayment, (newPayment) => {
        if (process.client) {
            localStorage.setItem('payment', JSON.stringify(newPayment));
        }
    }, {deep: true});

    return totalPayment
};


