export const ROUTES = {
    user: [
        {
            route: '/',
            label: 'Inicio'
        },
        { 
            route: '/',
            label: 'Categorías',
            subRoutes: [
                {
                    route: '/categorias/tecnologia',
                    label: 'Tecnología'
                },
                {
                    route: '/categorias/indumentaria',
                    label: 'Indumentaria'
                }
            ]
        },
        {
            route: '/contacto',
            label: 'Contacto'
        },
        {
            route: `/cart`,
            label: 'Carrito'
        }
    ],
    admin: [
        {
            route: '/admin',
            label: 'Admin de negocios'
        },
        {
            route: '/productos',
            label: 'Productos'
        }
    ]
} 