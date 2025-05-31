import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: 'skr9kUWjFOrF1KhGLvfXe2prZuS1p4dnPSFyyyc0iIAOOxL9ucuak9t1dCH16uyELgl4TyJRyrS7P0XHXKeDKdzmuQMLnqmPQbRVufMoKy8Jq2HgXKBrGPIbVUHBCfTvgC1bUBDPrsLSPVCSla7k8GjXChmpaXx29tpKBuOVSqaQ0twvXLRd',
})

export async function getUnits(term) {
  return client.fetch(`*[_type == "unit" && term == $term]{
    _id,
    code,
    name,
    description,
    grade,
    status,
    term
  }`, { term })
}

export async function createUnit(unit) {
  return client.create({
    _type: 'unit',
    ...unit
  })
}

export async function updateUnit(id, unit) {
  return client.patch(id)
    .set(unit)
    .commit()
}

export async function deleteUnit(unitId, authToken) {
  if (authToken !== process.env.NEXT_PUBLIC_ASSESSOR_TOKEN) {
    throw new Error('Unauthorized deletion attempt')
  }
  return client.delete(unitId)
}