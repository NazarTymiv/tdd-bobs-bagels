const Basket = require('../src/basket')

describe('Add Bagel', () => {
  it('passed sku which avaliable in inventory', () => {
    const basket = new Basket(5)

    const res = basket.addBagel('BGLO')

    expect(res.sku).toEqual('BGLO')
    expect(res.price).toEqual('0.49')
    expect(res.name).toEqual('Bagel')
    expect(res.variant).toEqual('Onion')
    expect(res.quantity).toEqual(1)
  })

  it('passed sku which unavaliable in inventory', () => {
    const basket = new Basket(5)

    const res = basket.addBagel('BBB')

    expect(res).toEqual('The bagel is not exist in our inventory')
  })

  it('When basket is full', () => {
    const basket = new Basket(1)

    basket.addBagel('BGLO')
    const res = basket.addBagel('BGLP')

    expect(res).toEqual('Your basket is full')
  })

  it('When added the same type of bagel 3 times', () => {
    const basket = new Basket(5)

    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    const res = basket.addBagel('BGLO')

    expect(res.sku).toEqual('BGLO')
    expect(res.price).toEqual('0.49')
    expect(res.name).toEqual('Bagel')
    expect(res.variant).toEqual('Onion')
    expect(res.quantity).toEqual(3)
  })
})

describe('Remove Bagel', () => {
  it('passed sky which exist in our basket', () => {
    const basket = new Basket(5)

    basket.addBagel('BGLO')
    basket.addBagel('BGLP')
    basket.addBagel('BGLE')

    const res = basket.removeBagel('BGLP')

    expect(res).toBeTrue()
    expect(basket.basketList.length).toEqual(2)
    expect(basket.basketList[0].sku).toEqual('BGLO')
    expect(basket.basketList[1].sku).toEqual('BGLE')
  })

  it('Passed sku which not exist in our basket', () => {
    const basket = new Basket(5)

    basket.addBagel('BGLO')

    const res = basket.removeBagel('BGLP')

    expect(res).toEqual('You do not have this bagel in your basket.')
  })

  it('Remove bagel when in the basket there is 4 quantity of the same type of bagel', () => {
    const basket = new Basket(5)

    basket.addBagel('BGLO')
    basket.addBagel('BGLO')
    basket.addBagel('BGLO')

    const res = basket.removeBagel('BGLO')

    expect(res).toBeTrue()
    expect(basket.basketList[0].quantity).toEqual(2)
  })
})
