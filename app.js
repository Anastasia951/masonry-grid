


function createMasonry(selector) {
  const COLUMNS_IN_MASONRY = 4
  const GAP = 10

  const masonry = document.querySelector(selector)
  const masonryItems = Array.from(masonry.querySelectorAll('.masonry__item'))
  const masonryHeight = masonry.offsetHeight
  const masonryWidth = masonry.offsetWidth

  const MaxItemHeight = Math.floor(masonryHeight / (masonryItems.length / COLUMNS_IN_MASONRY))
  const MinItemHeight = 20

  function getTop(number) {
    const prevoiusItems = masonryItems.filter((_, index) => index % COLUMNS_IN_MASONRY === number % COLUMNS_IN_MASONRY && index < number)

    if (!prevoiusItems.length) return 0

    return prevoiusItems.reduce((acc, prev) => {
      return acc + parseInt(prev.style.height) + GAP
    }, 0)
  }

  function setRandomHeight(elem) {


    const randomHeight = Math.floor(Math.random() * (MaxItemHeight - MinItemHeight) + MinItemHeight + 1)

    elem.style.height = `${randomHeight}px`
  }

  function setPosition() {
    for (let i = 0; i < COLUMNS_IN_MASONRY; i++) {
      setTransform(masonryItems[i], 100 * i, GAP * i)
      setRandomHeight(masonryItems[i])
    }

    for (let i = COLUMNS_IN_MASONRY; i < masonryItems.length - COLUMNS_IN_MASONRY + 1; i++) {
      const top = getTop(i)


      setTransform(masonryItems[i], 100 * (i % COLUMNS_IN_MASONRY), GAP * (i % COLUMNS_IN_MASONRY), top)

      setRandomHeight(masonryItems[i])
    }

    for (let i = masonryItems.length - COLUMNS_IN_MASONRY; i < masonryItems.length; i++) {
      const top = getTop(i)
      const itemHeight = masonry.offsetHeight - top
      masonryItems[i].style.height = `${itemHeight}px`


      setTransform(masonryItems[i], 100 * (i % COLUMNS_IN_MASONRY), GAP * (i % COLUMNS_IN_MASONRY), top)
    }
  }

  function setTransform(elem, x, margin, y = 0) {
    elem.style.transform = `translateX(calc(${x}% + ${margin}px)) translateY(${y}px)`
  }
  setPosition()
}

createMasonry('#masonry')