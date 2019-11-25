import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/users/form'
import { get as getProperty } from './../../api/properties'
import { get as getRoom } from './../../api/rooms'
import { create } from './../../api/tenants'

function TenantCreatePage(props) {
  const { loading, error, tenant, create, getProperty, getRoom, property, room, currentUserID } = props
  const { propertyID, roomID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const createSubmit = (values) => {
    setSubmitted(true)
    create(currentUserID, propertyID, roomID, values)
  }

  useEffect(() => {
    getProperty(currentUserID, propertyID)
    getRoom(currentUserID, propertyID, roomID)
  }, [currentUserID, getProperty, propertyID, getRoom, roomID])

  useEffect(() => {
    if (!loading && !error && submitted && tenant) {
      props.history.push(`/properties/${propertyID}/rooms/${roomID}/tenants/${tenant.id}`)
    }
  }, [props.history, loading, error, submitted, propertyID, roomID, tenant])

  return (
    <div className='tenantCreatePage'>
      {
        property &&
        <div className='card'>
          <h4>{ property.name }</h4>
          <p>Type: { property.type }</p>
          <p>Address: { property.address }</p>
        </div>
      }

      {
        room &&
        <div className='card'>
          <h4>{ room.name }</h4>
          <p>Payment schedule: { room.paymentSchedule }</p>
          <p>Payment amount: { room.paymentAmount }</p>
        </div>
      }

      <Form
        onSubmit={createSubmit}
        loading={loading}
        submitError={error}
        title='Create tenant'
        submitText='Create tenant' />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.tenant.getIn(['createLoading']),
  error: state.tenant.getIn(['createError']),
  property: state.property.getIn(['property']),
  room: state.room.getIn(['room']),
  tenant: state.tenant.getIn(['tenant']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create,
  getProperty,
  getRoom,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TenantCreatePage)
