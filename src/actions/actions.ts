'use server'

import { prisma } from "@/lib/db"
import { nomService, transInter, uvTele } from "@prisma/client"
import { revalidatePath } from "next/cache"

/////////////// COMMISSION //////////////////////////////////

export async function createCommision(formData : FormData){
    await prisma.commissionDuMois.create({
        data:{
            mom_service: formData.get('mom_service') as nomService,
            debit: formData.get('debit') as unknown as number,
            montant: formData.get('montant') as unknown as number,
            sold: formData.get('montant_total') as unknown as number
        }
    })
    revalidatePath('/commission')
}

export async function editeCommission(formData : FormData, id: number){
    await prisma.commissionDuMois.update({
        where : {id},
        data: {
            mom_service: formData.get('mom_service') as nomService,
            debit: formData.get('debit') as unknown as number,
            montant: formData.get('montant') as unknown as number,
            sold: formData.get('montant_total') as unknown as number
        }
    })
}

export async function deleteCommision (id: number){
    await prisma.commissionDuMois.delete({where:{id}})
}

////////////////// CAISSE ////////////////////////

export async function createCaisse(formData : FormData){
    await prisma.caisse.create({
        data:{
            service: formData.get('service') as nomService,
            stock_initial: formData.get('stock_initial') as unknown as number,
            stock_final: formData.get('stock_final') as unknown as number,
            montant_total: formData.get('montant_total') as unknown as number
        }
    })
    revalidatePath('/caisse')
}

export async function editeCaisse(formData : FormData, id: number){
    await prisma.caisse.update({
        where : {id},
        data: {
            service: formData.get('service') as nomService,
            stock_initial: formData.get('stock_initial') as unknown as number,
            stock_final: formData.get('stock_final') as unknown as number,
            montant_total: formData.get('montant_total') as unknown as number
        }
    })
}

export async function deleteCaisse (id: number){
    await prisma.caisse.delete({where:{id}})
}

///////////// CLIENT CANAL + //////////////////////////////

export async function createClientCanal(formData : FormData){
    await prisma.clientCanal.create({
        data:{
            nom: formData.get('nom') as string,
            prenom: formData.get('prenom') as string,
            telephone: formData.get('telephone') as string,
            numAbonne: formData.get('numAbonne') as unknown as number,
            finAbonn: formData.get('finAbonn') as unknown as Date
        }
    })
    revalidatePath('/clientCanal')
}

export async function editeClientCanal(formData : FormData, id: number){
    await prisma.clientCanal.update({
        where : {id},
        data: {
            nom: formData.get('nom') as string,
            prenom: formData.get('prenom') as string,
            telephone: formData.get('telephone') as string,
            numAbonne: formData.get('numAbonne') as unknown as number,
            finAbonn: formData.get('finAbonn') as unknown as Date
        }
    })
}

export async function deleteClientCanal(id: number){
    await prisma.clientCanal.delete({where:{id}})
}

////////////// CREDIT DE L'ENTREPRISE //////////////////

export async function createCreditEntreprise(formData : FormData){
    await prisma.creditEntreprise.create({
        data:{
            nomClient: formData.get('nomClient') as string,
            prenomClient: formData.get('prenom') as string,
            motif: formData.get('telephone') as string,
            montant: formData.get('montant') as unknown as number,
            montant_paye: formData.get('montant_paye') as unknown as number,
            montant_restant: formData.get('montant_restant') as unknown as number,
            solde: formData.get('solde') as unknown as number 
        }
    })
    revalidatePath('/creditEntreprise')
}

export async function editeCreditEntreprise(formData:FormData, id: number) {
    await prisma.creditEntreprise.update({
        where: {id},
        data: {
            nomClient: formData.get('nomClient') as string,
            prenomClient: formData.get('prenom') as string,
            motif: formData.get('telephone') as string,
            montant: formData.get('montant') as unknown as number,
            montant_paye: formData.get('montant_paye') as unknown as number,
            montant_restant: formData.get('montant_restant') as unknown as number,
            solde: formData.get('solde') as unknown as number   
        }
    })
}

export async function deleteCreditEntreprise(id: number){
    await prisma.creditEntreprise.delete({where:{id}})
}

////////////////////////////// PREPAYEE ///////////////////

export async function createPrepayee(formData : FormData){
    await prisma.prepayee.create({
        data:{
            nom_client: formData.get('nom_client') as string,
            montant_initial: formData.get('montant_initial') as unknown as number,
            montant_depense: formData.get('montant_depense') as unknown as number,
            montant_restant: formData.get('montant_restant') as unknown as number,
        }
    })
    revalidatePath('/prepayee')
}

export async function editePrepayee(formData : FormData, id:number) {
    await prisma.prepayee.update({
        where: {id},
        data: {
            nom_client: formData.get('nom_client') as string,
            montant_initial: formData.get('montant_initial') as unknown as number,
            montant_depense: formData.get('montant_depense') as unknown as number,
            montant_restant: formData.get('montant_restant') as unknown as number,
        }
    })
}

export async function deletePrepayee(id: number){
    await prisma.prepayee.delete({where:{id}})
}

///////////////////// SERVICE ENTREPRISE ////////////////////////

export async function createServiceEntreprise(formData : FormData){
    await prisma.serviceEntreprise.create({
        data:{
            mom_service: formData.get('nom_client') as nomService,
            solde_a_nouveau: formData.get('solde_a_nouveau') as unknown as number,
            montant_final : formData.get('montant_final ') as unknown as number,
            total: formData.get('total') as unknown as number,
        }
    })
    revalidatePath('/serviceEntreprise')
}

export async function editeServiceEntreprise(formData : FormData, id:number) {
    await prisma.serviceEntreprise.update({
        where: {id},
        data : {
            mom_service: formData.get('nom_client') as nomService,
            solde_a_nouveau: formData.get('solde_a_nouveau') as unknown as number,
            montant_final : formData.get('montant_final ') as unknown as number,
            total: formData.get('total') as unknown as number,
        }
    })
}

export async function deleteServiceEntreprise(id:number) {
    await prisma.serviceEntreprise.delete({where:{id}})
}

///////////////////// TRANSFERT INTERNATIONNAL ///////////////////////////////////

export async function createTransInter(formData : FormData){
    await prisma.transInternation.create({
        data:{
            montant_initial: formData.get('montant_initial') as unknown as number,
            nom_service: formData.get('nom_service') as transInter,
            montant_trans: formData.get('montant_trans') as unknown as number,
            montant_recus: formData.get('montant_recus') as unknown as number,
            date_debut: formData.get('date_debut') as unknown as Date,
            date_fin : formData.get('date_fin') as unknown as Date,
            soldes: formData.get('soldes') as unknown as number,
            Decouvert: formData.get('Decouvert') as unknown as number,
            credit : formData.get('credit ') as unknown as number,
            debit_caisse: formData.get('debit_caisses') as unknown as number,
            debit_BNDA: formData.get('debit_BNDA') as unknown as number,
        }
    })
    revalidatePath('/transInter')
}

export async function editeTransInter(formData : FormData, id:number){
    await prisma.transInternation.update({
        where: {id},
        data: {
            montant_initial: formData.get('montant_initial') as unknown as number,
            nom_service: formData.get('nom_service') as transInter,
            montant_trans: formData.get('montant_trans') as unknown as number,
            montant_recus: formData.get('montant_recus') as unknown as number,
            date_debut: formData.get('date_debut') as unknown as Date,
            date_fin : formData.get('date_fin') as unknown as Date,
            soldes: formData.get('soldes') as unknown as number,
            Decouvert: formData.get('Decouvert') as unknown as number,
            credit : formData.get('credit ') as unknown as number,
            debit_caisse: formData.get('debit_caisses') as unknown as number,
            debit_BNDA: formData.get('debit_BNDA') as unknown as number,
        }
    })
}

export async function deleteTransInter(id:number){
    await prisma.transInternation.delete({where:{id}})
}

/////////////////////// UV Abonnement /////////////////////////////////

export async function createUvAbonne(formData : FormData){
    await prisma.uvAbonnement.create({
        data: {
            produit: formData.get('produit') as uvTele,
            montant: formData.get('montant') as unknown as number
        }
    })
    revalidatePath('/uvAbonnement')
}

export async function editeUvAbonne(formData : FormData, id:number){
    await prisma.uvAbonnement.update({
        where:{id},
        data: {
            produit: formData.get('produit') as uvTele,
            montant: formData.get('montant') as unknown as number
        }
    })
}

export async function deleteUvAbonne(id:number){
    await prisma.uvAbonnement.delete({where:{id}})
}