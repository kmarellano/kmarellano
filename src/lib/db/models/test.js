// COMPANY
[POST] CREATE COMPANY /api/portfolio/work
{
    body: {
        name: String,
        startDate: Date,
        endDate: Date,
    }
}

[GET] GET COMPANY /api/portfolio/work/:id

[GET] GET ALL COMPANIES /api/portfolio/work

[PUT] CREATE COMPANY /api/portfolio/work/:id
{
    body: {
        name: String,
        startDate: Date,
        endDate: Date,
    }
}



// PROJECTS
// Note :id is companyId, u should fetch the company first then apply it to the company
[POST] CREATE PROJECT /api/portfolio/work/:id/project
{
    body: {
        name: String,
        description: String,
        techStack: [String],
        accomplishments: [String],
    }
}

[GET] GET ONE PROJECT /api/portfolio/work/:id/project/:projectId

[GET] GET ALL PROJECTS /api/portfolio/work/:id/project

[PUT] UPDATE PROJECT /api/portfolio/work/:id/project/:projectId
{
    body: {
        name: String,
        description: String,
        techStack: [String],
        accomplishments: [String],
    }
}

[DELETE] DELETE PROJECT /api/portfolio/work/:id/project/:projectId

// ROLES
// Note :id is companyId, u should fetch the company first then apply it to the company
[POST] CREATE ROLE /api/portfolio/work/:id/role
{
    body: {
        title: String,
        date: Date,
        isPromotion: Boolean,
    }
}

[GET] GET ONE ROLE /api/portfolio/work/:id/role/:roleId

[GET] GET ALL ROLES /api/portfolio/work/:id/role

[PUT] UPDATE ROLE /api/portfolio/work/:id/role/:roleId
{
    body: {
        title: String,
        date: Date,
        isPromotion: Boolean,
    }
}

[DELETE] DELETE ROLE /api/portfolio/work/:id/role/:roleId

// Technologies
// id here is tech id
[POST] CREATE TECHNOLOGY /api/portfolio/tech
{
    body: {
        name: String,
        field: {
            type: String,
            enum: [
                'Frontend',
                'Backend',
                'DevOps',
                'Testing & Quality Assurance',
                'Monitoring & Logging',
            ],
        },
    }
}

[GET] GET ALL TECHS /api/portfolio/tech

[PUT] UPDATE TECH /api/portfolio/tech/:id
{
    body: {
        name: String,
        field: {
            type: String,
            enum: [
                'Frontend',
                'Backend',
                'DevOps',
                'Testing & Quality Assurance',
                'Monitoring & Logging',
            ],
        },
    }
}

[DELETE] DELETE TECH /api/portfolio/tech/:id/