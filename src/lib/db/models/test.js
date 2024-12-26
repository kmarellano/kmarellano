// COMPANY
[POST] CREATE COMPANY /api/admin/work
{
    body: {
        name: String,
        startDate: Date,
        endDate: Date,
    }
}

[GET] GET COMPANY /api/admin/work/:id

[GET] GET ALL COMPANIES /api/admin/work

[PUT] CREATE COMPANY /api/admin/work/:id
{
    body: {
        name: String,
        startDate: Date,
        endDate: Date,
    }
}



// PROJECTS
// Note :id is companyId, u should fetch the company first then apply it to the company
[POST] CREATE PROJECT /api/admin/work/:id/project
{
    body: {
        name: String,
        description: String,
        techStack: [String],
        accomplishments: [String],
    }
}

[GET] GET ALL PROJECTS /api/admin/work/:id/project

[GET] GET ONE PROJECT /api/admin/work/:id/project/:projectId

[GET] GET ALL PROJECTS /api/admin/work/:id/project

[PUT] UPDATE PROJECT /api/admin/work/:id/project/:projectId
{
    body: {
        name: String,
        description: String,
        techStack: [String],
        accomplishments: [String],
    }
}

[DELETE] DELETE PROJECT /api/admin/work/:id/project/:projectId

// ROLES
// Note :id is companyId, u should fetch the company first then apply it to the company
[POST] CREATE ROLE /api/admin/work/:id/role
{
    body: {
        title: String,
        date: Date,
        isPromotion: Boolean,
    }
}

[GET] GET ONE ROLE /api/admin/work/:id/role/:roleId

[GET] GET ALL ROLES /api/admin/work/:id/role

[PUT] UPDATE ROLE /api/admin/work/:id/role/:roleId
{
    body: {
        title: String,
        date: Date,
        isPromotion: Boolean,
    }
}

[DELETE] DELETE ROLE /api/admin/work/:id/role/:roleId

// Technologies
// id here is tech id
[POST] CREATE TECHNOLOGY /api/admin/tech
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

[GET] GET ALL TECHS /api/admin/tech

[PUT] UPDATE TECH /api/admin/tech/:id
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

[DELETE] DELETE TECH /api/admin/tech/:id/