
const commonTitle = '2ND DEPOSIT BONUS'
const commonTitleDE = '2. Einzahlungsbonus'

const promoTitles = {
    EN: commonTitle,

    AU: commonTitle,

    DE: commonTitleDE,

    CH: commonTitleDE,

    FR: 'Bonus de Deuxième Dépôt'
}

export const parametrizedData = [
        {lang: 'English', promoTitle: promoTitles.EN},
        {lang: 'English-AU', promoTitle: promoTitles.AU},
        {lang: 'German', promoTitle: promoTitles.DE},
        {lang: 'German-CH', promoTitle: promoTitles.CH},
        {lang: 'French', promoTitle: promoTitles.FR}
    ]


export const linksArrayMain: Array<string> = [
    'https://tombriches.com/',
    'https://tombriches1.com/',
]

export const linksArrayPromo: Array<string> = [
    'https://tombriches.com/bonuses',
    'https://tombriches1.com/bonuses',
]