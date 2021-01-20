# UNICEF Thailand Primero Interoperability
Repository to manage OpenFn jobs to integrate the UNICEF Primero and Thailand MoPH HIS and Child Shield systems for secure case referrals exchange.

### Note! Commits to 'master' branch will deploy automatically to live integration on OpenFn.org. 

## (1) Functional Requirements
Summarize...

_**Flow 1: MOPH referrals --> Primero**_
* User Story 1: Referring MOPH cases from HIS and Child Shield systems to Primero...

_**Flow 2: Primero --> Child Shield**_
* User Story 1: Sending Primero updates back to Child Shield...


## (2) System APIs
**APIs** implemented:
* Primero: [API v2](https://github.com/primeroIMS/primero/blob/development_v2/app/controllers/api/README.md)
* MOPH systems: [API endpoint](https://cloud1.r8way.moph.go.th:3010/api)

Login: 
```
curl --request POST 'https://cloud1.r8way.moph.go.th:3010/api/Users/login' --data-raw '{"email":"email", "password":"password"}'
```
Get patient: 
```
curl --location --request GET 'https://cloud1.r8way.moph.go.th:3010/api/VPatients?access_token=xxx&filter={% raw  %} {%22where%22:{%22cid%22:%22111%22}} {% endraw  %}'
```
Behavior: 
1. [sample record](https://github.com/OpenFn/unicef-thailand/blob/master/sample_data/HISsample.json)
2. [no record found](https://github.com/OpenFn/unicef-thailand/blob/master/sample_data/HISsample_no_record_found.json)

**OpenFn language-packages** (API adaptors) implemented: 
* [language-primero](https://github.com/OpenFn/language-primero)

## (3) Data Flows
Summarize....

_**Flow 1: MOPH referrals --> Primero**_
1. To list OpenFn jobs... 

_**Flow 2: Primero cases --> Child Shield**_
1. To list OpenFn jobs...


## (4) Flow Triggers
### Trigger Type: Timer

Event- or timer-based? 

### Integration Assumptions 
1. **Data Sharing**: ... 
2. **Unique Identifiers**: ...
3. **Services**: ...
4. **Primero Case Owner Assignment**: ... 

## (5) Data Flow Mappings & Transformations
[See this table](https://docs.google.com/spreadsheets/d/1f1fT3qmM4mKT98AaJ0ArlgONQRC-W9ghoa-j4BswwbM/edit?usp=sharing) for the integration mapping specifications. 

## (6) Change Management
System administrators are responsible for identifying if changes may impact the OpenFn integration. 
1. If login credentials are changed for either system, the relevant **Credential** must be updated in OpenFn.org. 
2. If system changes are made to any of the **fields** referenced in the [field mappings](), the OpenFn jobs should be reviewed and tested to confirm no impact on the integration. 
3. If the list of available  **Services** in either system changes, then the Services Map should be reviewed in the [mapping document](https://docs.google.com/spreadsheets/d/1f1fT3qmM4mKT98AaJ0ArlgONQRC-W9ghoa-j4BswwbM/edit?usp=sharing) to confirm no updates are required in the OpenFn jobs. 
4. ...

## (7) Administration
### Provisioning, Hosting, & Maintenance
This integration is hosted on [OpenFn.org](https://openfn.org/projects) with Primero SaaS. OpenFn will provide ongoing maintenance support. 

### Support 
Primero system administrators will be responsible for ongoing integration monitoring and management.
- Primero System Administrators:
- MOPH System Administrators:

Contact support@openfn.org with any questions or troubleshooting support. 

### Training Materials
- To list materials...


## Support Checklist
- [ ] OpenFn Admin users & access levels confirmed? 
- [ ] OpenFn Admin training
- [ ] Support POCs identified for each connected system? 
