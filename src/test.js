import DayColumn from './DayColumn'
import React, { Component } from 'react'
import * as dates from './utils/dates'
import PropTypes from 'prop-types'

class Test extends Component {
  constructor(props) {
    super(props)
  }

  renderColumn(resources, groupedEvents, range, accessors, components, now) {
    return resources.map(([id, resource], i) =>
      range.map((date, jj) => {
        let daysEvents = (groupedEvents.get(id) || []).filter(event =>
          dates.inRange(
            date,
            accessors.start(event),
            accessors.end(event),
            'day'
          )
        )

        return (
          <DayColumn
            {...this.props}
            localizer={this.props.data.localizer}
            min={dates.merge(date, this.props.data.min)}
            max={dates.merge(date, this.props.data.max)}
            resource={resource && id}
            components={components}
            isNow={dates.eq(date, now, 'day')}
            key={i + '-' + jj}
            date={date}
            events={daysEvents}
            dayLayoutAlgorithm={this.props.data.dayLayoutAlgorithm}
          />
        )
      })
    )
  }

  render() {
    const resources = this.props.data.resources
    const groupedEvents = this.props.data.groupedEvents
    const range = this.props.data.range
    const accessors = this.props.data.accessors
    const components = this.props.data.components
    const now = this.props.data.now
    return (
      <div style={this.props.style}>
        {this.renderColumn(
          resources,
          groupedEvents,
          range,
          accessors,
          components,
          now
        )}
      </div>
    )
  }
}

Test.propTypes = {
  data: PropTypes.any,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  localizer: PropTypes.object.isRequired,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
}

Test.defaultProps = {
  min: dates.startOf(new Date(), 'day'),
  max: dates.endOf(new Date(), 'day'),
}

export default Test
